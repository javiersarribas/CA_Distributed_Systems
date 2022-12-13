var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/medicineinventory.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var medicineinventory_proto = grpc.loadPackageDefinition(packageDefinition).medicineinventory
var client = new medicineinventory_proto.MedicineInventory("0.0.0.0:40000", grpc.credentials.createInsecure());

var call = client.totalCartValue(function(error, response) {
  if(error) {
    console.log("An error occured")
  } else {
    console.log("You have ordered " + response.medicine + " the total cost is: " + response.price)
  }
})

while(true) {
  var medicine_name = readlineSync.question("What is the name of the medicine? (q to Quit): ")
  if(medicine_name.toLowerCase() === "q") {
    break
  }
  var brand = readlineSync.question("Who is the medicine's brand? ")
  var price = readlineSync.question("How much does the medicine cost? ")

  call.write({
    price: parseFloat(price),
    brand: brand,
    name: medicine_name
  })
}

call.end()
