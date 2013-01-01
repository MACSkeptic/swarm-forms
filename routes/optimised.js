var requirejs = require('requirejs'),
    fs = require('fs'),
    config = {};

config.baseUrl = 'public/js/lib';
config.name = 'main';
config.out = 'public/optimised.js';

function respond(res, code, contents) {
  res.writeHead(code, {
    'Content-Type': (code === 200 ? 'application/javascript;charset=UTF-8' : 'text/plain'),
    'Content-Length': contents.length
  });

  res.write(contents, 'utf8');
  res.end();
}

exports.index = function (req, res) {
  config.out = function (optimisedJS) {
    respond(res, 200, optimisedJS);
  };
  requirejs.optimize(config, function () {}, function (e) { 
    respond(res, 500, e.toString()); 
  });
};
