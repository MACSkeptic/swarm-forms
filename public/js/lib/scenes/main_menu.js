define(function (require) {
  var demo = require('./demo'),
      firstRoom = require('./first_room'),
      challengeRoom = require('./challenge_room'),
      entities = [],
      selectedItem = 4,
      timeToSelect = 200;

  function init(callback) {
    entities.push({ type: 'menuBackground' });
    entities.push({ type: 'menuTitle', text: 'swarm cubes' });
    entities.push({ type: 'menuItem', text: 'demo', selected: false, index: 0 });
    entities.push({ type: 'menuItem', text: 'concept rooms', selected: false, index: 1 });
    entities.push({ type: 'menuItem', text: 'challenge', selected: true, index: 2 });
    entities.push({ type: 'helpText', text: 'up/down, then enter' });
    callback();
  }

  function update(params) {
    timeToSelect = timeToSelect - params.elapsed;

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

    if (input.keyPressed('down', 's')) { selectNewMenuItem(selectedItem + 1); }
    if (input.keyPressed('up', 'w')) { selectNewMenuItem(selectedItem - 1); }

    if (input.keyPressed('enter')) {
      if (entities[2].selected) {
        demo.init(function () { game.addScene(demo, true); });
      } else if (entities[3].selected) {
        firstRoom.init(function () { game.addScene(firstRoom, true); });
      } else {
        challengeRoom.init(function () { game.addScene(challengeRoom, true); });
      }
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
