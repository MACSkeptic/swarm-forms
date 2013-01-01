var requirejs = require('requirejs'),
    fs = require('fs'),
    config = {};

function respond(res, code, contents) {
  res.writeHead(code, {
    'Content-Type': (code === 200 ? 'application/javascript;charset=UTF-8' : 'text/plain'),
    'Content-Length': contents.length
  });

  res.write(contents, 'utf8');
  res.end();
}

exports.index = function (req, res) {
  requirejs.optimize({
    baseUrl: 'public/js/lib',
    name: 'main',
    out: function (optimisedJS) {
      respond(res, 200, optimisedJS);
    }
  }, function () {}, function (e) {
    respond(res, 500, e.toString());
  });
};

exports.external = function (req, res) {
  requirejs.optimize({
    baseUrl: 'public/js/external',
    include: [
      'jquery-1.8.2',
      'request_animation_frame_fix',
      'sylvester.src',
      'underscore'
    ],
    out: function (optimisedJS) {
      respond(res, 200, optimisedJS);
    }
  }, function () {}, function (e) {
    respond(res, 500, e.toString());
  });
};
