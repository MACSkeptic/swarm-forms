define(function (require) {
  var behaviours = require('../behaviours'),
      shoots     = behaviours.shoots,
      moves      = behaviours.moves,
      rectangle  = behaviours.rectangle;

  function update(params) {
    this.rotation += params.elapsed/200;

    if (this.rotation > Math.PI * 2) { this.rotation = 0; }

    _.find(this.children, function (shotA) {
      if (shotA.disposed) { return; }

      return _.find(this.children, function (shotB) {
        if (shotA === shotB) { return; }

        return (
          (
            Math.pow(shotA.x - shotB.x, 2) + Math.pow(shotA.y - shotB.y, 2)
          ) <= Math.pow(shotA.radius + shotB.radius, 2)
        ) && (
          (
            shotA.collidesWith.shot &&
            shotA.collidesWith.shot.apply(shotA, [shotB])
          ) || true
        );
      }, this);
    }, this);
  }

  function percentageToShootAgain() {
    return Math.min(1, this.timeSinceLastShot / this.timeRequiredBetweenShots);
  }

  function undoLastMovement() { this.undoLastMovement(); }

  function create(specs) {
    return _.extend(
      rectangle({ width: 30, height: 30 }),
      moves(),
      {
        type: 'player',
        rotation: 0,
        collidesWith: {
          rock: undoLastMovement,
          hole: undoLastMovement,
          boundaries: undoLastMovement
        }
      },
      shoots({ update: update }),
      specs || {}
    );
  }

  return create;
});
