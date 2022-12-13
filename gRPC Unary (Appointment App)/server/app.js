var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/calc.proto"
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH
)
var calc_proto = grpc.loadPackageDefinition(packageDefinition).calc


function add(call, callback) {
  try{
    var number1 = parseInt(call.request.number1)
    var number2 = parseInt(call.request.number2)
    if(!isNaN(number1) && !isNaN(number2)) {
      var result = number1 + number2
      callback(null, {
        message: undefined,
        result: result
      })
    } else {
      callback(null, {
        message: "Please specify two numbers"
      })
    }
  } catch(e) {
    callback(null, {
      message: "An error occured!"
    })
  }

}

function subtract(call, callback) {
  try{
    var number1 = parseInt(call.request.number1)
    var number2 = parseInt(call.request.number2)
    if(!isNaN(number1) && !isNaN(number2)) {
      var result = number1 - number2
      console.log(result)
      callback(null, {
        message: undefined,
        result: result
      })
    } else {
      callback(null, {
        message: "Please specify two numbers"
      })
    }
  } catch(e) {
    callback(null, {
      message: "An error occured!"
    })
  }

}

function divide(call, callback) {
  try {
    var number1 = parseInt(call.request.number1)
    var number2 = parseInt(call.request.number2)
    if(number2 === "0") {
      callback(null, {
        message: "Cannot divide by 0"
      })
    }

    else if(!isNaN(number1) && !isNaN(number2)) {
      var result = number1 / number2
      callback(null, {
        message: undefined,
        result: result
      })
    } else {
      callback(null, {
        message: "Please specify two numbers"
      })
    }
  } catch(e) {
    callback(null, {
      message: "An error occured during computation"
    })
  }
}

function multiply(call, callback) {
  try{
    var number1 = parseInt(call.request.number1)
    var number2 = parseInt(call.request.number2)
    if(!isNaN(number1) && !isNaN(number2)) {
      var result = number1 * number2
      callback(null, {
        message: undefined,
        result: result
      })
    } else {
      callback(null, {
        message: "Please specify two numbers"
      })
    }
  } catch(e) {
    callback(null, {
      message: "An error occured!"
    })
  }

}

var server = new grpc.Server()
server.addService(calc_proto.CalcService.service, {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide
})


server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
  server.start()
})
