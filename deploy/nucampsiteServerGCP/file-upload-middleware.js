// Adapted from https://cloud.google.com/functions/docs/samples/functions-http-form-data and https://www.mikesukmanowsky.com/blog/firebase-file-and-image-uploads

const Busboy = require('busboy');
const os = require('os');
const path = require('path');
const fs = require('fs');

exports.filesUpload = function (req, res, next) {
    const busboy = Busboy({
        headers: req.headers,
        limits: {
            fileSize: 10 * 1024 * 1024
        }
    });

    const fields = {};
    const files = [];
    const fileWrites = [];
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    const tmpdir = os.tmpdir();

    busboy.on('field', (key, value) => {
        // You could do additional deserialization logic here, values will just be
        // strings
        fields[key] = value;
    });

    busboy.on('file', (fieldname, file, { filename }, encoding, mimetype) => {
        const filepath = path.join(tmpdir, filename);
        console.log(
            `Handling file upload field ${fieldname}: ${filename} (${filepath})`
        );
        const writeStream = fs.createWriteStream(filepath);
        file.pipe(writeStream);

        fileWrites.push(
            new Promise((resolve, reject) => {
                file.on('end', () => writeStream.end());
                writeStream.on('finish', () => {
                    fs.readFile(filepath, (err, buffer) => {
                        const size = Buffer.byteLength(buffer);
                        console.log(`${filename} is ${size} bytes`);
                        if (err) {
                            return reject(err);
                        }

                        files.push({
                            fieldname,
                            originalname: filename,
                            encoding,
                            mimetype,
                            buffer,
                            size
                        });

                        try {
                            fs.unlinkSync(filepath);
                        } catch (error) {
                            return reject(error);
                        }

                        resolve();
                    });
                });
                writeStream.on('error', reject);
            })
        );
    });

    busboy.on('finish', () => {
        Promise.all(fileWrites)
            .then(() => {
                req.body = fields;
                req.files = files;
                next();
            })
            .catch(next);
    });

    busboy.end(req.rawBody);
};
