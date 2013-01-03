define(function (require) {
  var spriteBasedEntity  = require('../entities/sprite_based_entity'),
      spriteAnimation = require('../assets/sprite_animation'),
      entities = [];

  var zero = spriteBasedEntity({ sprite: 'zeroStanding1' });
  var zeroStandingAnimation = spriteAnimation({ frames: { 'zeroStanding1': 150, 'zeroStanding2': 150, 'zeroStanding3': 150, 'zeroStanding4': 150 } });

  function init(callback) {
    entities.push(zero);
    callback();
  }

  function update(params) {
    zeroStandingAnimation.update(params.elapsed);
    zero.sprite = zeroStandingAnimation.currentSprite();
  }

  return {
    'name': 'sprites-room',
    'init': init,
    'update': update,
    'entities': entities,
    'width': 640,
    'height': 480
  };

});
