define([
  ],
  function () {

    function applyTo(entity, elapsed, propertyName) {
      if (!entity.movable) { return; }

      entity.previousX = entity.x;
      entity.previousY = entity.y;
      entity.x = entity.x + entity.velocityX * elapsed/10;
      entity.y = entity.y + entity.velocityY * elapsed/10;
    }

    return {
      'applyTo': applyTo
    };
  }
);
