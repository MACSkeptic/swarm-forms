define(function (require) {
  var spriteBasedEntity  = require('../entities/sprite_based_entity'),
      spriteAnimation = require('../assets/animated_sprite'),
      spriteAnimations = require('../assets/sprite_animations'),
      entities = [];

  var zero = spriteBasedEntity({ sprite: 'zeroStanding1' });
  var link = spriteBasedEntity({ sprite: 'linkRunningRight' });
  
  var zeroStandingAnimation = spriteAnimation(spriteAnimations.zeroStanding);
  var linkRunningUpAnimation = spriteAnimation(spriteAnimations.linkRunningRight);

  function init(callback) {
    entities.push(zero);
    entities.push(link);
    link.x = 50;
    link.y = 50;
    callback();
  }

  function update(params) {
    zeroStandingAnimation.update(params.elapsed);
    linkRunningUpAnimation.update(params.elapsed);
    
    link.sprite = linkRunningUpAnimation.currentSprite();
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
