define([
  ],
  function () {

    function applyTo(entity, elapsed, propertyName) {
      if (!entity.isAffectedByGravity) { return; }

      entity.velocityY = entity.velocityY + elapsed/1000;
    }

    return {
      "applyTo": applyTo
    };
  }
);
