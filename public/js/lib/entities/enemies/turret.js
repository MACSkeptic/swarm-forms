define(function(require) {
  var circle = require('../../behaviours/circle'),
      shoots = require('../../behaviours/shoots');


  function create(specs) {
    return _.extend(
      shoots(),
      circle({ radius: 10 }),
      { type: 'turret' },
      specs || {}
    );
  }

  return create;
});
