var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/calc.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var calc_proto = grpc.loadPackageDefinition(packageDefinition).calc
var client = new calc_proto.CalcService("0.0.0.0:40000", grpc.credentials.createInsecure());

var action = readlineSync.question(
  "What would you like to do?\n"
  + "\t 1 to add two numbers\n"
  + "\t 2 to subtract two numbers\n"
  + "\t 3 to divide two numbers\n"
  + "\t 4 to multiply two numbers\n"
)

action = parseInt(action)

if(action === 1) {
  var number1 = readlineSync.question("What is the first number?")
  var number2 = readlineSync.question("What is the second number?")
  try {
    client.add({number1: number1, number2: number2}, function(error, response) {
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


} else if(action === 2) {
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

  } else {
    console.log("Error: Operation not recognized")
  }


/*var readlineSync = require('readline-sync')
var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/calc.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)
var calc_proto = grpc.loadPackageDefinition(packageDefinition).calc
var client = new calc_proto.CalcService("0.0.0.0:40000", grpc.credentials.createInsecure());

var number1 = readlineSync.question("What is the first number to add?")
var number2 = readlineSync.question("What is the second number to add?")

try {
  client.add({number1: number1, number2: number2}, function(error, response) {
    try{
      if(response.message) {
        console.log(response.message)
      } else {
        console.log(response.result)
      }
    } catch(e) {
      console.log("Could not connect to Server")
    }

  })
} catch(e) {
  console.log("An error occured!")
}
*/
