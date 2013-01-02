/**
 * Module dependencies.
 */
var express = require('express')
  , home = require('./routes/home')
  , optimised = require('./routes/optimised')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io');

var app = express();
var server = http.createServer(app);

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

app.get('/', home.index);
app.get('/optimised.js', optimised.index);
app.get('/external.js', optimised.external);

server.listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});

var iox = io.listen(server);

if (process.argv.indexOf('--debugjs') < 0) {
  iox.enable('browser client minification');
  iox.enable('browser client etag');
  iox.enable('browser client gzip');
  iox.set('log level', 1);
}

iox.sockets.on('connection', function (socket) {
  console.log('connected');
});
