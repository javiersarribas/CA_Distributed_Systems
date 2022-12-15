var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/contacts.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)

var contacts = grpc.loadPackageDefinition(packageDefinition).contacts

var client = new contacts.ContactService("0.0.0.0:40000", grpc.credentials.createInsecure());

var call = client.getContact({ })

console.log("-------------------------------------------------------\nDoctor Phone Number Directory (Name, Section, Number):\n-------------------------------------------------------")


call.on('data', (response) => { /*=> Same as function, or "anonymous function", arrow function*/
  console.log("Dr. " + response.contactName + ", from " + response.section + " : " + response.phoneNumber)
})

call.on('end', function() {

})

call.on('error', function(e) {
  console.log(e)
})
