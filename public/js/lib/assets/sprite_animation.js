define(function () {
  
  var animation = { frames: {mySprite1: 600, mySprite2: 600, mySprite3: 600 }, flow: 'loop', currentFrame: 0};

  function update(elapsed) {
    this.elapsed += elapsed;
    if (this.elapsed >= this.frames[this.sprites[this.currentFrame]]) {
      this.nextFrame();
    }
  }

  function handleOutOfBounds() {
    if (this.currentFrame >= this.sprites.size) {
      if (this.flow == 'loop') {
        this.currentFrame = 0;
      } else {
        this.currentFrame = this.sprites.size - 2;
        this.goingForward = !this.goingForward;
      }
    }
  }

  function nextFrame() {
    if (this.goingForward) {
      this.currentFrame = this.currentFrame + 1;
    } else {
      this.currentFrame = this.currentFrame - 1;
    }
    handleOutOfBounds();
  }

  function create(specs) {
    var spriteAnimation = {};
    spriteAnimation.sprites = _.keys(this.frames);
    spriteAnimation.direction = 'forward';
    spriteAnimation.currentFrame = 0;
    spriteAnimation.elapsed = 0;
    spriteAnimation.flow = 'loop';
    spriteAnimation.goingForward = true;
    return _.extend(spriteAnimation, specs || {});
  }
  
  return create;
});