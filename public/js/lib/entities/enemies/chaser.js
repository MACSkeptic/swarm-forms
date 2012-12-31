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
      this.velocityX = vector.x;
      this.velocityY = vector.y;
    }
  }


  function create(specs) {
    return _.extend(
      moves(),
      rectangle({ width: 10, height: 10 }),
      { type: 'chaser', enemy: true, chaseVelocity: 1, update: update },
      specs || {}
    );
  }

  return create;
});
