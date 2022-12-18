var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/contacts.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)

var contacts = grpc.loadPackageDefinition(packageDefinition).contacts

var client = new contacts.ContactService("0.0.0.0:40000", grpc.credentials.createInsecure());

var call = client.getContact({ })

console.log("-------------------------------------------------------\nDoctor Phone Number Directory (Name, Section, Number):\n-------------------------------------------------------")

//call.on data determines what happens when we receive some data from our server,
//logging out the name of doctors, the section where they work, and
//their phone numbers.
call.on('data', (response) => { /*=> Same as function, or "anonymous function", arrow function*/
  console.log("Dr. " + response.contactName + ", from " + response.section + " : " + response.phoneNumber)
})

//call.on end function invoked when the stream of data ends from the server to the
//client. (Line 24 on app.js client side, where tells the client the stream
//has ended.)
call.on('end', function() {

})
//call.on error function will be invoked when an error occurs.
call.on('error', function(e) {
  console.log(e)
})
