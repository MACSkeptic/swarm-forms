define(function (require) {

  var behaviours = require('../mechanics/behaviours'),
      moves      = behaviours.moves,
      rectangle  = behaviours.rectangle;

  function create(specs) {
    return _.extend(
      rectangle({ width: 30, height: 30 }),
      { type: 'sprite'},
      moves({ velocity: 2 }),
      specs || {});
  }

  return create;
});
