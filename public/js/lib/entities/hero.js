define(function (require) {
  var guns = require('./../components/guns'),
      behaviours = require('../mechanics/behaviours'),
      moves      = behaviours.moves,
      rectangle  = behaviours.rectangle,
      spriteAnimation = require('../mechanics/animated_sprite'),
      spriteAnimations = require('../assets/sprite_animations'),
      spriteActor = require('../mechanics/sprite_actor');

  function update(params) {
    this.actor.update(params.elapsed);
  }

  function handleMovement(params) {
    if (!params.input.keyPressed('a') && !params.input.keyPressed('d')) { this.velocityX = 0; }
    if (!params.input.keyPressed('w') && !params.input.keyPressed('s')) { this.velocityY = 0; }

    if (params.input.keyPressed('a')) { this.velocityX = -this.velocity; this.actor.changeState('left'); }
    if (params.input.keyPressed('s')) { this.velocityY = this.velocity; this.actor.changeState('down'); }
    if (params.input.keyPressed('d')) { this.velocityX = this.velocity; this.actor.changeState('right'); }
    if (params.input.keyPressed('w')) { this.velocityY = -this.velocity; this.actor.changeState('up'); }
  }

  function handleInput(params) {
    handleMovement.apply(this, [params]);
  }

  function undoLastMovement(other, algorithm) { this.undoLastMovement(other, algorithm); }

  function currentSprite() {
    return this.actor.currentSprite();
  }

  function create(specs) {

    var linkWalkingUpAnimation = spriteAnimation(spriteAnimations.linkWalkingUp);
    var linkWalkingDownAnimation = spriteAnimation(spriteAnimations.linkWalkingDown);
    var linkWalkingLeftAnimation = spriteAnimation(spriteAnimations.linkWalkingLeft);
    var linkWalkingRightAnimation = spriteAnimation(spriteAnimations.linkWalkingRight);

    var actor = spriteActor({states: {
      up: linkWalkingUpAnimation,
      down: linkWalkingDownAnimation,
      left: linkWalkingLeftAnimation,
      right: linkWalkingRightAnimation
    }});

    var hero = _.extend(
      rectangle({ width: 30, height: 30 }),
      moves({ velocity: 2 }),
      {
        type: 'spriteActor',
        rotation: 0,
        handleInput: handleInput,
        collidesWith: {
          rock: undoLastMovement,
          hole: undoLastMovement,
          boundaries: undoLastMovement
        }
      },
      specs || {}
    );
    hero.actor = actor;
    hero.currentSprite = currentSprite;
    hero.update = update;

    return hero;
  }

  return create;
});
