define(function (require) {
  var entities = [],
      entitiesModule = require('../entities'),
      room = entitiesModule.room,
      player = entitiesModule.player,
      boundaries = entitiesModule.boundaries;

  function init(callback) {
    entities.push(boundaries({ maxX: 1152, maxY: 720 }));
    entities.push(room({ width: 1152, height: 720 }));
    entities.push(player({ x: 1152/2, y: 720/2 }));

    callback();
  }

  function update(params) {
  }

  function handleInput(params) {
  }

  return {
    "init": init,
    "update": update,
    "entities": entities,
    "handleInput": handleInput,
    "width": 1152,
    "height": 720,
    "name": 'first-room'
  };
});
