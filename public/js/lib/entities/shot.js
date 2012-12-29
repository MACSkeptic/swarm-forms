define(function () {

  function collisionWithSquare(square) {
    this.velocityX *= -1 + Math.random()/100;
    this.velocityY *= -1 + Math.random()/100;
  }

  function createSuperShot(shot) {
    shot.radius += shot.radius;
    this.collidesWith.shot = undefined;
    this.dispose;
  }

  function outOfBounds() { this.disposed = true; }
  function disintegrate() { this.disposed = true; }

  function create(specs) {
    var shot = {};

    shot.x = specs.x || 0;
    shot.y = specs.y || 0;
    shot.radius = 4;
    shot.velocityX = specs.velocityX || 0;
    shot.velocityY = specs.velocityY || 0;
    shot.isMovable = true;
    shot.type = 'shot';
    shot.update = specs.update;

    shot.collidesWith = {
      square: collisionWithSquare,
      boundaries: outOfBounds,
      shot: createSuperShot,
      rock: disintegrate
    };

    return shot;
  }

  return create;
});
