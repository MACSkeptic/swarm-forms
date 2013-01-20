define(function () {

  function changeState(newState) {
    var animation = this.states[newState];
    var oldState = this.currentState;
    this.currentState = newState;
    if (this.currentState != oldState) {
      animation.reset();
    }
  }

  function currentSprite() {
    var animation = this.states[this.currentState];
    return animation.currentSprite();
  }

  function update(elapsed) {
    var animation = this.states[this.currentState];
    animation.update(elapsed);
  }

  function create(specs) {
    var actor = {};
    _.extend(actor, specs);
    actor.changeState = changeState;
    actor.currentSprite = currentSprite;
    actor.currentState = actor.initialState || _.keys(specs.states)[0];
    actor.update = update;
    return actor;
  }

  return create;
});