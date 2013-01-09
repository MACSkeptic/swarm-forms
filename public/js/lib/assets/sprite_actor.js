define(function () {

  function changeState(newState) {
    var animation = this.states[newState];
    this.currentState = animation;
    animation.reset();
  }

  function currentSprite() {
    var animation = this.states[this.currentState];
    return animation.currentSprite();
  }

  function create(specs) {
    var actor = {};
    _.extend(actor, specs);
    actor.changeState = changeState;
    actor.currentSprite = currentSprite;
    actor.currentState = actor.initialState || _.keys(specs.states)[0];
  }

});