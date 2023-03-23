const http = require("http");

function willItBlend(callbackFn) {
  // should be true for anything divisible by 3 between 0 and 9
  const itBlends = Math.floor(Math.random() * 10) % 3 === 0;

  if (itBlends) {
    callbackFn(null, "Good news! It Blends!");
  } else {
    callbackFn(new Error("Oh No! It didn't Blend!"));
  }
}

//create a server object:
http
  .createServer(function (req, res) {
    /* Comment out the line below and below it, write a call to 
     willItBlend. Write the callback function that is passed to 
     willItBlend as an arrow function, inline within the argument
     list for the call to willItBlend(). 
       In the arrow function body, conditionally write two calls
       to res.end() - one with the success message string, and
       one with the error message string from the call 
       to willItBlend(). 
 */
    willItBlend(function (err, message) {
      if (err) {
        res.end(err.message);
      } else {
        res.end(message);
      }
    });
  })
  .listen(8080); //the server object listens on port 8080

// this is a fork of https://codesandbox.io/s/rl9v3156lp
