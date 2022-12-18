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
)

action = parseInt(action)

if(action === 1) {
  console.log("--------------------------------------------------------------\nPlease enter the following details to request your appoinment:\n--------------------------------------------------------------\n")
  var name = readlineSync.question("What is your name? ")
  var day = readlineSync.question("Enter day: ")
  var month = readlineSync.question("Enter month: ")
  var year = readlineSync.question("Enter year: ")
  var doctor = readlineSync.question("Please enter the specialist request: ")

  console.log("Your booking has been confirmed for: \n" + name + ", on the " + day + "-" + month + "-" + year + ", with the specialist of " + doctor + ".")
  /*try {
    client.add({name: name, day: day, month: month, year: year, doctor: doctor}, function(error, response) {
      try {
        if(response.message) {
          console.log(response.message)
        } else {
          console.log(response.result)
        }
      } catch(e) {
        console.log("Could not connect to server")
      }
    })
  } catch(e) {
    console.log("An error occured")
  }*/


}


/*
else if(action === 2) {
  var number1 = readlineSync.question("What is the first number?")
  var number2 = readlineSync.question("What is the second number?")
  try {
    client.subtract({number1: number1, number2: number2}, function(error, response) {
      try {
        if(response.message) {
          console.log(response.message)
        } else {
          console.log(response.result)
        }
      } catch(e) {
        console.log("Could not connect to server")
      }
    })
  } catch(e) {
    console.log("An error occured")
  }

}  else if(action === 3) {
    var number1 = readlineSync.question("What is the first number?")
    var number2 = readlineSync.question("What is the second number?")
    try {
      client.divide({number1: number1, number2: number2}, function(error, response) {
        try {
          if(response.message) {
            console.log(response.message)
          } else {
            console.log(response.result)
          }
        } catch(e) {
          console.log("Could not connect to server")
        }
      })
    } catch(e) {
      console.log("An error occured")
    }


}  else if(action === 4) {
    var number1 = readlineSync.question("What is the first number?")
    var number2 = readlineSync.question("What is the second number?")
    try {
      client.multiply({number1: number1, number2: number2}, function(error, response) {
        try {
          if(response.message) {
            console.log(response.message)
          } else {
            console.log(response.result)
          }
        } catch(e) {
          console.log("Could not connect to server")
        }
      })
    } catch(e) {
      console.log("An error occured")
    }

  }

*/
   else {
    console.log("Error: Operation not recognized")
  }
