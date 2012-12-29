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

  function update(params) {
  }

  function handleInput(params) {
    var input = params.input, elapsed = params.elapsed, game = params.game;
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
    "width": 640,
    "height": 360,
    "name": 'first-room'
  };
});
