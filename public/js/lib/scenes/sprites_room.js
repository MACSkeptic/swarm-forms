define(function (require) {
  var heroEntity = require('../entities/hero'),
  entities = [];

  var hero = heroEntity({ x: 100, y: 100 });

  function init(callback) {
    entities.push(hero);
    callback();
  }

  function update(params) {

  }

  function handleInput(params) {
    hero.handleInput(params);
  }

  return {
    'name': 'sprites-room',
    'handleInput': handleInput,
    'init': init,
    'update': update,
    'entities': entities,
    'width': 640,
    'height': 480
  };

});
