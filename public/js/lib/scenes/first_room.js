define([
  '../entities/room',
  '../entities/boundaries'
], function (room, boundaries) {
  var entities = [];

  function init(callback) {
    entities.push(boundaries({ maxX: 640, maxY: 360 }));
    entities.push(room());

    callback();
  }

  function update(elapsed) {
  }

  function handleInput(input, elapsed, game) {
    if(input.keyPressed('esc')){
      game.changeCurrentSceneByName('main-menu');
      return;
    }
  }

  return {
    "init": init,
    "update": update,
    "entities": entities,
    "handleInput": handleInput,
    "name": 'first-room'
  };
});
