define(function(require) {
  var behaviours = require('../../behaviours'),
      rectangle = behaviours.rectangle,
      moves = behaviours.moves,
      geometry = require('../../utils/geometry'),
      findTarget = require('../../utils/find_target');

  function update(params) {
    chase.apply(this, [
      findTarget.ofType('player', [
        [params.currentScene.player],
        params.currentScene.players,
        params.currentScene.entities
      ])
    ]);
  }

  function chase(target) {
    if (!target) { return; }

    alterVelocityByVector.apply(this, [
      geometry.createVector2dFromPointAndModule(target, this, this.chaseVelocity)
    ]);
  }

  function alterVelocityByVector(vector) {
    this.velocityX = vector.x;
    this.velocityY = vector.y;
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
