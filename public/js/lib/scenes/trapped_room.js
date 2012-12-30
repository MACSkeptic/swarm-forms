define([
  '../entities/room',
  '../entities/boundaries',
  '../entities/traps/tower',
  '../entities/player',
  '../entities/area_trigger'

], function (room, boundaries, tower, player, areaTrigger) {

  var trappedRoom = {}

  trappedRoom.create = function (specs) {
    var entities = [];

    function init(callback) {
      entities.push(boundaries({ maxX: 640, maxY: 360 }));
      entities.push(room());
      entities.push(player({ x: 100, y: 100 }));
      
      var towerTrap = tower({ x: 640/2, y: 360/2});
      
      var area = areaTrigger({ x: 200, y: 200 }, _.bind(towerTrap.shootRight, towerTrap));
      entities.push(towerTrap);
      entities.push(area);
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
        var next = trappedRoom.create();
        next.init(function () { game.addScene(next, true); });
      },
      "name": 'current-room'
    }, specs || {});
  };

  return trappedRoom.create();
});
