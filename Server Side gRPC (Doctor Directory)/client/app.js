var grpc = require("@grpc/grpc-js")
var protoLoader = require("@grpc/proto-loader")
var PROTO_PATH = __dirname + "/protos/movies.proto"

var packageDefinition = protoLoader.loadSync(PROTO_PATH)

var movies = grpc.loadPackageDefinition(packageDefinition).movies

var client = new movies.MovieService("0.0.0.0:40000", grpc.credentials.createInsecure());

var call = client.getFavouriteMovies({ })

call.on('data', (response) => { /*=> Same as function, or "anonymous function", arrow function*/
  console.log(response.favouriteMovie + " people chose " + response.movieType + " as their favourite movie!")
})

call.on('end', function() {

})

call.on('error', function(e) {
  console.log(e)
})
