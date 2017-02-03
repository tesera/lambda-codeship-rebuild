var spawn = require('child_process').spawn;

var invokeRubyApp = "./app";

exports.handler = function(event, context) {
  console.log("Starting process: " + invokeRubyApp);

  for(var key in event.queryStringParameters) {
    process.env[key.toUpperCase()] = event.queryStringParameters[key];
  }

  var child = spawn(invokeRubyApp);

  child.stdout.on('data', function (data) { console.log("stdout:\n"+data); });
  child.stderr.on('data', function (data) { console.log("stderr:\n"+data); });

  child.on('close', function (code) {
    if(code === 0) {
      context.succeed({statusCode: 200, body: 'OK'});
    } else {
      context.fail({statusCode: 500, body: 'ERROR'});
    }
  });
}
