define(function(require) {
  var behaviours = require('../../behaviours'),
      rectangle = behaviours.rectangle,
      moves = behaviours.moves,
      geometry = require('../../utils/geometry');


  function update(params) {
    if (params.currentScene.player) {
      var vector = geometry.createVector2dFromPointAndModule(
        params.currentScene.player(),
        this,
        this.chaseVelocity
      );
      this.x += vector.x;
      this.y += vector.y;
    }
  }


  function create(specs) {
    return _.extend(
      rectangle({ width: 10, height: 10 }),
      { type: 'chaser', enemy: true, chaseVelocity: 0.5, update: update },
      specs || {}
    );
  }

  return create;
});
