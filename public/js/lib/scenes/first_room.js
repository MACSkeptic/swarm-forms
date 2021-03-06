define(function (require) {
  var room = require('../entities/room'),
      boundaries = require('../entities/boundaries'),
      currentRoom = require('./current_room'),
      trappedRoom = require('./trapped_room'),
      spritesRoom = require('./sprites_room'),
      entities = [];

  function init(callback) {
    entities.push(boundaries({ maxX: 640, maxY: 360 }));
    entities.push(room());
    entities.push({ type: 'helpText', text: 'space or t' });

    callback();
  }

  function update(params) {
  }

  function handleInput(params) {
    var input = params.input, elapsed = params.elapsed, game = params.game;

    if (input.keyPressed('space')) {
      currentRoom.init(function () { game.addScene(currentRoom, true); });
      return;
    }

    if (input.keyPressed('t')) {
      trappedRoom.init(function () { game.addScene(trappedRoom, true); });
      return;
    }

    if (input.keyPressed('s')) {
      spritesRoom.init(function () { game.addScene(spritesRoom, true); });
      return;
    }
  }

  return {
    'init': init,
    'update': update,
    'entities': entities,
    'handleInput': handleInput,
    'width': 640,
    'height': 360,
    'name': 'first-room'
  };
});
