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

  call.on('data', function(request) {
    price += request.price
    medicine += 1
  })

  call.on("end", function() {
    callback(null, {
      price: price,
      medicine: medicine
    })
  })

  call.on('error', function(e) {
    console.log("An error occured")
  })

}

var server = new grpc.Server()
server.addService(medicineinventory_proto.MedicineInventory.service, { totalCartValue: totalCartValue })
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
  server.start()
})
