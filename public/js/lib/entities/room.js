define([
 './rock',
 './hole'
], function (rock, hole) {

  function pickRandomHoleLayout() {
    var random = Math.random()

    if (random < 0.5) {
      return [
        hole({x: 320, y: 280, width: 300}),
        hole({x: 320, y: 80, width: 300})
      ];
    } else {
      return [
        hole({x: 20, y: 20}),
        hole({x: 620, y: 340}),
        hole({x: 20, y: 340}),
        hole({x: 620, y: 20})
      ];
    }
  }

  function pickRandomRockLayout() {
    var random = Math.random()

    if (random < 0.5) {
      return [
        rock({x: 220, y: 180 }),
        rock({x: 420, y: 180 })
      ];
    } else {
      return [
        rock({x: 120, y: 120}),
        rock({x: 520, y: 240}),
        rock({x: 120, y: 240}),
        rock({x: 520, y: 120})
      ];
    }
  }

  function create(specs) {
    var room = {};

    room.type = 'room';

    room.children = [];

    _.each(pickRandomHoleLayout(), function (currentHole) {
      room.children.push(currentHole);
    });

    _.each(pickRandomRockLayout(), function (currentRock) {
      room.children.push(currentRock);
    });

    return _.extend(room, specs || {});
  }

  return create;
});
