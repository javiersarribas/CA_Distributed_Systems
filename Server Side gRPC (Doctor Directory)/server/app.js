var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/contacts.proto"
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH
)
var contacts_proto = grpc.loadPackageDefinition(packageDefinition).contacts

var data = [
  {
    contactName:"James McCarthy",
    phoneNumber: 089568995
  },
  {
    contactName:"Lucy Miles",
    phoneNumber: 087445986
  },
  {
    contactName:"Marija Stribl",
    phoneNumber: 087326998
  },

  {
    contactName:"Alberto Ortiz",
    phoneNumber: 0874512365
  },
  {
    contactName:"Andrew Wall",
    phoneNumber: 0896532245
  }
]

function getPhoneNumber(call, callback) {
  for(var i = 0; i < data.length; i++) {
    call.write({
      contactName: data[i].contactName,
      phoneNumber: data[i].phoneNumber
    })
  }
  call.end()
}

var server = new grpc.Server()
server.addService(contacts_proto.ContactService.service, { getPhoneNumber: getPhoneNumber})
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
  server.start()
})
