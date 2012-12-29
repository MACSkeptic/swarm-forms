define([
  '../entities/room',
  '../entities/boundaries',
  '../entities/trigger_to_next_room',
  '../entities/player'
], function (room, boundaries, triggerToNextRoom, player) {

  var currentRoom = {}

  currentRoom.create = function (specs) {
    var entities = [];

    function init(callback) {
      entities.push(boundaries({ maxX: 640, maxY: 360 }));
      entities.push(room());
      entities.push(player({ x: 100, y: 100 }));
      entities.push(triggerToNextRoom({ x: 320, y: 200 }));

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

      if(input.keyPressed('a')){
        entities[2].velocityX = -1;
        entities[2].velocityY = 0;
      }
      if(input.keyPressed('s')){
        entities[2].velocityX = 0;
        entities[2].velocityY = 1;
      }
      if(input.keyPressed('d')){
        entities[2].velocityX = 1;
        entities[2].velocityY = 0;
      }
      if(input.keyPressed('w')){
        entities[2].velocityX = 0;
        entities[2].velocityY = -1;
      }
    }

    return _.extend({
      "init": init,
      "update": update,
      "entities": entities,
      "handleInput": handleInput,
      "width": 640,
      "height": 360,
      "next": function (game) { 
        var next = currentRoom.create();
        next.init(function () { game.addScene(next, true); });
      },
      "name": 'current-room'
    }, specs || {});
  };

  return currentRoom.create();
});
