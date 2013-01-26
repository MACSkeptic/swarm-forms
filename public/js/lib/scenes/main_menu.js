define(function (require) {
  var demo = require('./demo'),
      firstRoom = require('./first_room'),
      challengeRoom = require('./challenge_room'),
      entities = [],
      selectedItem = 4,
      menuBackground = { type: 'menuBackground', rotation: 0, scale: 0 },
      timeToSelect = 200;

  function init(callback) {
    entities.push(menuBackground);
    entities.push({ type: 'menuTitle', text: 'swarm forms' });
    entities.push({ type: 'helpText', text: 'press enter to start' });
    callback();
  }

  function update(params) {
    timeToSelect = timeToSelect - params.elapsed;

    menuBackground.rotation = menuBackground.rotation + ((params.elapsed * 2 * Math.PI) / 3000);
    menuBackground.scale = menuBackground.scale + (params.elapsed / 1000);

    if (menuBackground.rotation > 2 * Math.PI) { menuBackground.rotation = 0; }
    if (menuBackground.scale > 1) { menuBackground.scale = 0; }

    if (timeToSelect <= 0) { timeToSelect = 0; }
  }

  function selectNewMenuItem(newIndex) {
    if (timeToSelect > 0) { return; }
    timeToSelect = 200;
    selectedItem = newIndex > 4 ?  2 : (newIndex < 2 ? 4 : newIndex);
    entities[2].selected = false;
    entities[3].selected = false;
    entities[4].selected = false;
    entities[selectedItem].selected = true;
  }

  function handleInput(params) {
    var input = params.input, elapsed = params.elapsed, game = params.game;

    if (input.keyPressed('enter')) {
      challengeRoom.init(function () { game.addScene(challengeRoom, true); });
      return;
    }

    if (input.keyPressed('d')) {
      demo.init(function () { game.addScene(demo, true); });
      return;
    }

    if (input.keyPressed('f')) {
      firstRoom.init(function () { game.addScene(firstRoom, true); });
      return;
    }

    if (input.keyPressed('c')) {
      challengeRoom.init(function () { game.addScene(challengeRoom, true); });
      return;
    }
  }

  return {
    'name': 'main-menu',
    'init': init,
    'update': update,
    'entities': entities,
    'handleInput': handleInput,
    'width': 1280,
    'height': 720
  };
});
