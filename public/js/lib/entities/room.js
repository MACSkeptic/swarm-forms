define([
 './rock',
 './hole'
], function (rock, hole) {

  function create(specs) {
    var room = {};

    room.type = 'room';
    room.children = [];
    room.children.push(rock({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(rock({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(rock({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(rock({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(rock({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(rock({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(rock({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(rock({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(rock({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(hole({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(hole({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(hole({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(hole({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(hole({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(hole({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(hole({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(hole({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(hole({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(hole({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));
    room.children.push(hole({x: Math.random() * 600 + 20, y: Math.random() * 320 + 20}));


    return _.extend(room, specs || {});
  }

  return create;
});
