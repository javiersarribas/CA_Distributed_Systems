var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/medicineinventory.proto"
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH
)

var medicineinventory_proto = grpc.loadPackageDefinition(packageDefinition).medicineinventory

function totalCartValue(call, callback) {
  var medicine = 0
  var price = 0

//call.on data --> Listener function that determines what happens when we receive
//some data from our client here we are incrementing the amount of medicines
//and adding the medicines price to the total price.
  call.on('data', function(request) {
    price += request.price
    medicine += 1
  })

//call.on end --> function will be invoked when the stream of data ends from
//client to the server, when the stream of data is ended we send back the total
//amount of medicines with their price by using the callback function (this
//function sends data from our server to our client).
  call.on("end", function() {
    callback(null, {
      price: price,
      medicine: medicine
    })
  })

////call.on error --> function will be invoked when an error occurs. 
  call.on('error', function(e) {
    console.log("An error occured")
  })

}

var server = new grpc.Server()
server.addService(medicineinventory_proto.MedicineInventory.service, { totalCartValue: totalCartValue })
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
  server.start()
})
