define([
  '../entities/room',
  '../entities/boundaries',
  './current_room',
  './trapped_room'

], function (room, boundaries, currentRoom, trappedRoom) {
  var entities = [],
      currentRoom = currentRoom,
      trappedRoom = trappedRoom;

  function init(callback) {
    entities.push(boundaries({ maxX: 640, maxY: 360 }));
    entities.push(room());
    entities.push({ type: 'helpText', text: 'press space' });

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

    if(input.keyPressed('space')) {
      currentRoom.init(function () { game.addScene(currentRoom, true); });
      return;
    }

    if(input.keyPressed('t')) {
      trappedRoom.init(function () { game.addScene(trappedRoom, true); });
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
