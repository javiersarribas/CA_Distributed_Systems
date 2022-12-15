var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/contacts.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var contacts_proto = grpc.loadPackageDefinition(packageDefinition).contacts

var data = [
  {
    contactName:"James McCarthy",
    phoneNumber: 35389568995,
    section: "General medicine"
  },
  {
    contactName:"Lucy Miles",
    phoneNumber: 35387445986,
    section: "Urology"
  },
  {
    contactName:"Marija Stribl",
    phoneNumber: 35387326998,
    section: "Pediatry"
  },

  {
    contactName:"Alberto Ortiz",
    phoneNumber: 353874512365,
    section: "Odontology"
  },
  {
    contactName:"Andrew Wall",
    phoneNumber: 353896532245,
    section: "Dental"
  },
  {
    contactName:"David Bucur",
    phoneNumber: 353875485523,
    section: "Psychology"
  },
  {
    contactName:"Karina Pysz",
    phoneNumber: 353886258874,
    section: "Oncology"
  },
  {
    contactName:"Marika Myerkevicz",
    phoneNumber: 353985634584,
    section: "Dietist"
  },
  {
    contactName:"Adam Connolly",
    phoneNumber: 353876585547,
    section: "Blood Specialist"
  },
  {
    contactName:"Laura Kelly",
    phoneNumber: 353894548998,
    section: "Dermathologist"
  }
]

function getContact(call, callback) {
  for(var i = 0; i < data.length; i++) {
    call.write({
      contactName: data[i].contactName,
      phoneNumber: data[i].phoneNumber,
      section: data[i].section
    })
  }
  call.end()
}

var server = new grpc.Server()
server.addService(contacts_proto.ContactService.service, {
  getContact: getContact
})
server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
  server.start()
})
