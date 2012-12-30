define(['../behaviours/circle', '../behaviours/moves'], function (circle, moves) {

  function createSuperShot(shot) {
    shot.radius += this.radius;
    shot.velocityX += this.velocityX;
    shot.velocityY += this.velocityY;

    delete this.collidesWith.shot;
    this.disposed = true;
  }

  function outOfBounds() { this.disposed = true; }
  function vanish() { this.disposed = true; }

  function create(specs) {
    return _.extend(
      circle({ radius: 4 }),
      moves(),
      {
        type: 'shot',
        collidesWith: {
          boundaries: outOfBounds,
          shot: createSuperShot,
          rock: vanish,
          tower: vanish
        }
      }, specs || {}
    );
  }

  return create;
});
