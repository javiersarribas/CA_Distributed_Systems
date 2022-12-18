var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/appointment.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var appointment_proto = grpc.loadPackageDefinition(packageDefinition).appointment
var client = new appointment_proto.AppService("0.0.0.0:40000", grpc.credentials.createInsecure());

var action = readlineSync.question(
  "What would you like to do?\n"
  + "\t 1 - To request a new appointment\n"
  + "\t 2 - To modify a new appointment\n"
  + "\t 3 - To delete a new appointment\n"
)

action = parseInt(action)

if(action === 1) {
  console.log("--------------------------------------------------------------\nPlease enter the following details to request your appoinment:\n--------------------------------------------------------------\n")
  var name = readlineSync.question("What is your name? ")
  var surname = readlineSync.question("What is your surname? ")
  var day = readlineSync.question("Enter day: ")
  var month = readlineSync.question("Enter month: ")
  var year = readlineSync.question("Enter year: ")
  var doctor = readlineSync.question("Please enter the specialist request: ")

  console.log("Your booking has been confirmed for: \n" + name + " " + surname + ", on the " + day + "-" + month + "-" + year + ", with the specialist of " + doctor + ".")

} else if(action === 2) {
  console.log("--------------------------------------------------------------\nPlease enter the following details to modify your appoinment:\n--------------------------------------------------------------\n")
  var name = readlineSync.question("What is your name? ")
  var surname = readlineSync.question("What is your surname? ")
  var day = readlineSync.question("Enter day of your confirmed appointment: ")
  var month = readlineSync.question("Enter month of your confirmed appointment: ")
  var year = readlineSync.question("Enter year of your confirmed appointment: ")
  var doctor = readlineSync.question("Please enter the specialist requested: ")

  var newday = readlineSync.question("Enter new day:")
  var newmonth = readlineSync.question("Enter new month:")
  var newyear = readlineSync.question("Enter new year:")

  console.log("Your booking has been modified for: \n" + name + " " + surname + ", on the " + newday + "-" + newmonth + "-" + newyear + ", with the specialist of " + doctor + ".")

} else if(action === 3) {
  console.log("--------------------------------------------------------------\nPlease enter the following details to delete your appoinment:\n--------------------------------------------------------------\n")
  var name = readlineSync.question("What is your name? ")
  var surname = readlineSync.question("What is your surname? ")
  var day = readlineSync.question("Enter day of your confirmed appointment: ")
  var month = readlineSync.question("Enter month of your confirmed appointment: ")
  var year = readlineSync.question("Enter year of your confirmed appointment: ")
  var doctor = readlineSync.question("Please enter the specialist requested: ")


  var action = readlineSync.question("Your booking for: \n" + name + " " + surname + ", on the " + day + "-" + month + "-" + year + ", with the specialist of " + doctor + "\n\n Is gonna be deleted. Confirm? (Press 1: YES // Press 2: NO):")
    action = parseInt(action)
    if(action === 1) {
    console.log("\n--------------------------------------------------------------\nThank you, your booking has been successfully cancelled.\n--------------------------------------------------------------\n")
    }
    if(action ===2) {
    console.log("\n--------------------------------------------------------------\nNo worries! Your booking is still active.\n--------------------------------------------------------------\n")
    }
}

   else {
    console.log("Error: Operation not recognized")
  }
