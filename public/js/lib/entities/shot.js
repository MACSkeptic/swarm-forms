define(function () {

  function create(specs) {
    var shot = {};

    shot.x = specs.x || 0;
    shot.y = specs.y || 0;
    shot.radius = 10;
    shot.velocityX = specs.velocityX || 0;
    shot.velocityY = specs.velocityY || 0;
    shot.isMovable = true;
    shot.type = 'shot';
    shot.update = specs.update;

    return shot;
  }

  return create;
});
