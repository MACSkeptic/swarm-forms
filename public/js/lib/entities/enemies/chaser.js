define(function (require) {
  var behaviours = require('../../mechanics/behaviours'),
      rectangle = behaviours.rectangle,
      moves = behaviours.moves,
      geometry = require('../../utils/geometry'),
      findTarget = require('../../utils/find_target');

  function update(params) {
    chase.apply(this, [
      findTarget.ofType('player').amongst([
        [params.currentScene.player],
        params.currentScene.players,
        params.currentScene.entities
      ])
    ]);

    this.rotation = this.rotation + (params.elapsed) * Math.PI / 150;
    if (this.rotation >= 2 * Math.PI) { this.rotation = 0; }
  }

  function chase(target) {
    if (!target) { return; }

    alterVelocityByVector.apply(this, [
      geometry.createVector2dFromPointAndModule(target, this, this.chaseVelocity)
    ]);
  }

  function killAndVanish(other) { this.disposed = true; other.disposed = true; }

  function alterVelocityByVector(vector) {
    this.velocityX = vector.x;
    this.velocityY = vector.y;
  }

  function create(specs) {
    return _.extend(
      moves({ chaseVelocity: 1 }),
      rectangle({ width: 10, height: 10 }),
      { type: 'chaser', enemy: true, update: update, rotation: 0, collidesWith: { player: killAndVanish } },
      specs || {}
    );
  }

  return create;
});
