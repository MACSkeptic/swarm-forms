define(function () {

  function triggered(player) {
    this.triggered = true;
  }

  function update(params) {
    if (this.triggered) {
      this.disposed = true;
      params.currentScene.next(params.game);
    }

    this.animationStep += this.stepping * (params.elapsed/100);

    if (this.animationStep > 20) {
      this.stepping = -1;
    } else if (this.animationStep <= 1) {
      this.animationStep = 1;
      this.stepping = 1;
    }
  }

  function create(specs) {
    var triggerToNextRoom = {};

    triggerToNextRoom.type = 'triggerToNextRoom';
    triggerToNextRoom.x = 0;
    triggerToNextRoom.y = 0;
    triggerToNextRoom.animationStep = 1;
    triggerToNextRoom.stepping = 1;
    triggerToNextRoom.radius = 50;
    triggerToNextRoom.update = update;
    triggerToNextRoom.collidesWith = { player: triggered };

    return _.extend(triggerToNextRoom, specs || {});
  }

  return create;
});
