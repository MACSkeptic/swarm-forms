define(['../behaviours/shoots'], function (shoots) {
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

  function create(specs) {
    return shoots(_.extend({
      x: 0            , y: 0         , 
      width: 30       , height: 30   , 
      velocityX: 0    , velocityY: 0 , 
      isMovable: true , 
      type: 'player'  , 
      rotation: 0     , 
      update: update
    }, specs || {}));
  }

  return create;
});
