import { createServer } from "http";
import generateMessage from "./generate";

const locations = ["Bellingham", "Marysville", "Seattle", "Tacoma", "Spokane"];

//create a server object:
createServer(function (req, res) {
  res.write(generateMessage(locations)); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080

// this is a fork from https://codesandbox.io/s/xvw8orl17q
