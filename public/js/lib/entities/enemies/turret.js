define(function(require) {
  var circle = require('../../behaviours/circle'),
      shoots = require('../../behaviours/shoots');


  function create(specs) {
    return shoots(circle(specs));
  }

  return create;
});
