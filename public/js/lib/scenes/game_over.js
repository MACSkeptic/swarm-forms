define(function (require) {
  var entities = [];

  function init(callback) {
    entities.push({ type: 'gameOver' });
    callback();
  }

  return {
    'name': 'game-over',
    'init': init,
    'entities': entities,
    'width': 1280,
    'height': 720
  };
});
