define(function () {

  function update(elapsed) {
    this.elapsed += elapsed;
    if (this.elapsed >= this.frames[this.sprites[this.currentFrame]]) {
      this.nextFrame();
    }
  }

  function handleOutOfBounds() {
    if (this.currentFrame == this.sprites.length) {
      if (this.flow == 'loop') {
        this.currentFrame = 0;
      } else {
        this.currentFrame = this.sprites.size - 2;
        this.goingForward = !this.goingForward;
      }
    }

    else if (this.currentFrame < 0) {
      if (this.flow == 'loop') {
        this.currentFrame = this.sprites.length - 1;
      } else {
        this.currentFrame = 1;
        this.goingForward = !this.goingForward;
      }
    }
  }

  function nextFrame() {
    this.elapsed = 0;
    if (this.goingForward) {
      this.currentFrame = this.currentFrame + 1;
    } else {
      this.currentFrame = this.currentFrame - 1;
    }
    this.handleOutOfBounds();
  }

  function currentSprite() {
    return this.sprites[this.currentFrame];
  }

  function create(specs) {
    var spriteAnimation = {};
    spriteAnimation.direction = 'forward';
    spriteAnimation.currentFrame = 0;
    spriteAnimation.elapsed = 0;
    spriteAnimation.flow = 'loop';
    spriteAnimation.goingForward = true;
    spriteAnimation.currentSprite = currentSprite;
    spriteAnimation.update = update;
    spriteAnimation.nextFrame = nextFrame;
    spriteAnimation.handleOutOfBounds = handleOutOfBounds;

    _.extend(spriteAnimation, specs || {});
    spriteAnimation.sprites = _.keys(spriteAnimation.frames || {});
    return spriteAnimation;
  }

  return create;
});
