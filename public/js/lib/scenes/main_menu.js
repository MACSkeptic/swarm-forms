define([
    './demo'
  ], function (demo) {
  var entities = [
    { type: 'menuBackground' },
    { type: 'menuTitle', text: 'swarm cubes' },
    { type: 'menuItem', text: 'demo', selected: true, index: 0 },
    { type: 'menuItem', text: 'game', selected: false, index: 1 }
  ];

  function init(callback) {
    callback();
  }

  function handleInput(input, elapsed, game) {
    if (input.keyPressed('down')) {
      entities[2].selected = false;
      entities[3].selected = true;
    }

    if (input.keyPressed('up')) {
      entities[2].selected = true;
      entities[3].selected = false;
    }

    if (input.keyPressed('enter')) {
      if (entities[2].selected) {
        demo.init(function () { game.addScene(demo, true); });
      } else {
      }
    }
  }

  return {
    "name": 'main-menu',
    "init": init,
    "entities": entities,
    "handleInput": handleInput
  };
});
