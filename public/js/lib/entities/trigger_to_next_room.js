define(function () {

  function triggered(player) {
    this.triggered = true;
  }

  function update(params) {
    if (this.triggered) {
      this.disposed = true;
      params.game.changeCurrentSceneTo(this.next);
    }
  }

  function create(specs) {
    var triggerToNextRoom = {};

    triggerToNextRoom.type = 'triggerToNextRoom';
    triggerToNextRoom.x = 0;
    triggerToNextRoom.y = 0;
    triggerToNextRoom.radius = 50;
    triggerToNextRoom.collidesWith = { player: triggered };

    return _.extend(triggerToNextRoom, specs || {});
  }

  return create;
});