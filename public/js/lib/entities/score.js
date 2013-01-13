define(function (require) {

  function increment(delta) {
    this.score = this.score + (delta || this.delta);
  }

  function decrement(delta) {
    this.score = this.score - (delta || this.delta);
  }

  function create(specs) {
    return _.extend({
      type: 'score',
      score: 0,
      delta: 1,
      increment: increment,
      decrement: decrement
    }, specs || {});
  }
  

  return create;
});
