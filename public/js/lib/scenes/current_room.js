define(function (require) {
  var entities          = require('../entities'),
      room              = entities.room,
      boundaries        = entities.boundaries,
      triggerToNextRoom = entities.triggerToNextRoom,
      player            = entities.player,
      turret            = entities.enemies.turret,
      chaser            = entities.enemies.chaser,
      currentRoom       = {};

  currentRoom.create = function (specs) {
    var entities = [];

    function init(callback) {
      entities.push(boundaries({ maxX: 640, maxY: 360 }));
      entities.push(room());
      entities.push(player({ x: 75, y: 75 }));
      entities.push(triggerToNextRoom({ x: 320, y: 200 }));
      entities.push({ type: 'helpText', text: 'wasd to move, arrows to shoot' });
      entities.push(turret({ x: 220, y: 220 }));
      entities.push(chaser({ x: 320, y: 320 }));

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

      if(!input.keyPressed('a') && !input.keyPressed('d')) {
        entities[2].velocityX = 0;
      }

      if(!input.keyPressed('w') && !input.keyPressed('s')) {
        entities[2].velocityY = 0;
      }

      if(input.keyPressed('a')){
        entities[2].velocityX = -2;
      }
      if(input.keyPressed('s')){
        entities[2].velocityY = 2;
      }
      if(input.keyPressed('d')){
        entities[2].velocityX = 2;
      }
      if(input.keyPressed('w')){
        entities[2].velocityY = -2;
      }

      if(input.keyPressed('left')){
        entities[2].shootLeft(params);
      }
      if(input.keyPressed('right')){
        entities[2].shootRight(params);
      }
      if(input.keyPressed('up')){
        entities[2].shootUp(params);
      }
      if(input.keyPressed('down')){
        entities[2].shootDown(params);
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
