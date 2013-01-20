define(function (require) {
  var entities          = require('../mechanics/entities'),
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
      entities.push(room({ addRandomStuff: true }));
      entities.push(player({ x: 75, y: 75 }));
      entities.push(triggerToNextRoom({ x: 320, y: 200 }));
      entities.push({ type: 'helpText', text: 'wasd to move, arrows to shoot' });
      entities.push(turret({ x: 220, y: 220 }));
      entities.push(chaser({ x: 320, y: 320 }));

      callback();
    }

    function update(params) {}

    function handleInput(params) { entities[2].handleInput(params); }

    return _.extend({
      'init': init,
      'update': update,
      'entities': entities,
      'handleInput': handleInput,
      'width': 640,
      'height': 360,
      'next': function (game) {
        var next = currentRoom.create();
        next.init(function () { game.addScene(next, true); });
      },
      'name': 'current-room'
    }, specs || {});
  };

  return currentRoom.create();
});
