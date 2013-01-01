define([
  '../entities/room',
  '../entities/boundaries',
  '../entities/traps/tower',
  '../entities/player',
  '../entities/area_trigger',
  '../entities/enemies/wanderer',
  '../entities/enemies/turret'

], function (room, boundaries, tower, player, areaTrigger, wanderer, turret) {

  var trappedRoom = {};

  trappedRoom.create = function (specs) {
    var entities = [];

    function init(callback) {
      entities.push(boundaries({ maxX: 640, maxY: 360 }));
      entities.push(room({ addRandomStuff: true }));
      entities.push(player({ x: 150, y: 150 }));

      var enemy1 = wanderer({ x: 640/2, y: 340/2, speed : Math.floor(Math.random() * 4) +1 });
      var enemy2 = wanderer({ x: 640/2, y: 340/2, speed : Math.floor(Math.random() * 4) +1 });
      var enemy3 = wanderer({ x: 640/2, y: 340/2, speed : Math.floor(Math.random() * 4) +1 });
      var enemy4 = wanderer({ x: 640/2, y: 340/2, speed : Math.floor(Math.random() * 4) +1 });
      var enemy5 = wanderer({ x: 640/2, y: 340/2, speed : Math.floor(Math.random() * 4) +1 });
      var enemy6 = wanderer({ x: 640/2, y: 340/2, speed : Math.floor(Math.random() * 4) +1 });
      var enemy7 = wanderer({ x: 640/2, y: 340/2, speed : Math.floor(Math.random() * 4) +1 });
      var enemy8 = wanderer({ x: 640/2, y: 340/2, speed : Math.floor(Math.random() * 4) +1 });      

      var towerTrap = tower({ x: 640/2, y: 360/2});

      var areaTrigger1 = areaTrigger({ x: 100, y: 180, whenTriggered: _.bind(towerTrap.shootLeft, towerTrap) });
      var areaTrigger2 = areaTrigger({ x: 320, y: 20, whenTriggered: _.bind(towerTrap.shootUp, towerTrap) });
      var areaTrigger3 = areaTrigger({ x: 320, y: 320, whenTriggered: _.bind(towerTrap.shootDown, towerTrap) });
      var areaTrigger4 = areaTrigger({ x: 500, y: 180, whenTriggered: _.bind(towerTrap.shootRight, towerTrap) });
      
      entities.push({ type: 'helpText', text: "It's a trap!" });
      entities.push(turret({ x: 320, y: 140 }));
      entities.push(towerTrap);
      entities.push(areaTrigger1);
      entities.push(areaTrigger2);
      entities.push(areaTrigger3);
      entities.push(areaTrigger4);
      entities.push(enemy1);
      entities.push(enemy2);
      entities.push(enemy3);
      entities.push(enemy4);
      entities.push(enemy5);
      entities.push(enemy6);
      entities.push(enemy7);
      entities.push(enemy8);      

      callback();
    }

    function update(params) {}

    function handleInput(params) { entities[2].handleInput(params); }

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
