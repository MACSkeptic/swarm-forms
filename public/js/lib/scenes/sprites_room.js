define(function (require) {
  var spriteBasedEntity  = require('../entities/sprite_based_entity'),
      entities = [];

  function init(callback) {
    entities.push(spriteBasedEntity({ sprite: 'zeroStanding1' }));
    callback();
  }

  function update(params) {

  }

  return {
    'name': 'sprites-room',
    'init': init,
    'update': update,
    'entities': entities,
    'width': 640,
    'height': 480
  };

});
