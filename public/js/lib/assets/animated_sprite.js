define(function () {

  function update(elapsed) {
    this.elapsed += elapsed;
    if (this.elapsed >= this.frames[this.sprites[this.currentFrame]]) {
      nextFrame.apply(this);
    }
  }

  function handleOutOfBounds() {
    if (this.goingForward && this.currentFrame == this.sprites.length) {
      if (this.flow == 'loop') {
        this.currentFrame = 0;
        return;
      } else {
        this.currentFrame = this.sprites.length - 2;
        this.goingForward = !this.goingForward;
        return;
      }
    }

    else if (!this.goingForward && this.currentFrame == -1) {
      if (this.flow == 'loop') {
        this.currentFrame = this.sprites.length - 1;
        return;
      } else {
        this.currentFrame = 1;
        this.goingForward = !this.goingForward;
        return;
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
    handleOutOfBounds.apply(this);
  }

  function currentSprite() {
    return this.sprites[this.currentFrame];
  }

  function reset() {
    if (this.startingFrame) {
      this.currentFrame = this.startingFrame;
    } else {
      this.currentFrame = 0;
    }
  }

  function create(specs) {
    if (!specs || !specs.frames || specs.frames.lenght === 0) {
      throw new Error('You need to specify frames for the animation at creation time.');
    }
    var spriteAnimation = {};
    spriteAnimation.direction = 'forward';
    spriteAnimation.currentFrame = specs.initialFrame || 0;
    spriteAnimation.elapsed = 0;
    spriteAnimation.flow = 'loop';
    spriteAnimation.goingForward = true;
    spriteAnimation.currentSprite = currentSprite;
    spriteAnimation.update = update;

    _.extend(spriteAnimation, specs || {});
    spriteAnimation.sprites = _.keys(spriteAnimation.frames || {});
    return spriteAnimation;
  }

  return create;
});
