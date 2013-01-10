define(function (require) {
  var spriteBasedEntity  = require('../entities/sprite_based_entity'),
      spriteAnimation = require('../assets/animated_sprite'),
      spriteAnimations = require('../assets/sprite_animations'),
      spriteActor = require('../assets/sprite_actor'),
      entities = [];

  var zero = spriteBasedEntity({ sprite: 'zeroStanding1' });
  var link = spriteBasedEntity({ sprite: 'linkWalkingRight' });
  
  var zeroStandingAnimation = spriteAnimation(spriteAnimations.zeroStanding);
  var linkWalkingUpAnimation = spriteAnimation(spriteAnimations.linkWalkingUp);
  var linkWalkingDownAnimation = spriteAnimation(spriteAnimations.linkWalkingDown);
  var linkWalkingLeftAnimation = spriteAnimation(spriteAnimations.linkWalkingLeft);
  var linkWalkingRightAnimation = spriteAnimation(spriteAnimations.linkWalkingRight);

  var linkActor = spriteActor({states: {
    up: linkWalkingUpAnimation,
    down: linkWalkingDownAnimation,
    left: linkWalkingLeftAnimation,
    right: linkWalkingRightAnimation
  }
  });

  function init(callback) {
    entities.push(zero);
    entities.push(link);
    link.x = 50;
    link.y = 50;
    callback();
  }

  function update(params) {
    zeroStandingAnimation.update(params.elapsed);
    linkWalkingUpAnimation.update(params.elapsed);
    
    link.sprite = linkWalkingUpAnimation.currentSprite();
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
