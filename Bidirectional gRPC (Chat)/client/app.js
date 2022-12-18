var readline = require('readline');
var readlineSync = require('readline-sync');
var PROTO_PATH = __dirname + "/protos/chat.proto";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var chat_proto = grpc.loadPackageDefinition(packageDefinition).chat

var client = new chat_proto.ChatService("0.0.0.0:40000", grpc.credentials.createInsecure());

var name = readlineSync.question("Welcome to the MedApp Assistance Chat 24/7! \n\nAll information provided on this chat is anonymous and completely confidential. \nPlease input your name to join the chatroom: ")
//sendMessage function --> defines set of listener functions client side stream.
var call = client.sendMessage();

//call.on data --> Listener function determines what happens when we receive some
//data from our server here we log the message out to the console and who send it.
call.on('data', function(resp) {
  console.log(resp.name + ": " + resp.message)
});

//will be invoked when the server tells the client to quit the application
//(when the call.end() is invoked on line 3 of the server app.js) in this case
// this function does nothing.
call.on('end', function() {
});

//call.on error --> invoked when an error occurs
call.on("error", function(e) {
  console.log("Cannot connect to chat server")
})

//call.write function sends a message to the server, someone joined the chat room.
call.write({
  message: name + " joined the chat.",
  name: name
});

//Defining how to take in input with our readline module, the "rl.on…" on line
//36 will allow us to continuously receive messages from other users.
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//rl.on line function, and determines if the user enters the message "quit",
//then then a message will be sent to other users that we have quit the
// application and will end the connection.
rl.on("line", function(message) {
  if (message.toLowerCase() === "quit") {
    call.write({
      message: name + " left the chatroom",
      name: name
    });
    call.end();
    rl.close();
  } else {

    //this is writing messages to the server which will then be sent to all
    //other users
    call.write({
      message: message,
      name: name
    });
  }
});
