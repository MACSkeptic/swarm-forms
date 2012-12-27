
/**
 * Module dependencies.
 */

var express = require('express')
  , home = require('./routes/home')
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

server.listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});

io.listen(server).sockets.on('connection', function (socket) {
  console.log('connected');
});
