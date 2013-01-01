define(function () {
  function undoLastMovement(other, algorithm) {
    if (this.previousX === undefined || this.previousY === undefined) { return; }

    if (!algorithm) { return revertX(this) && revertY(this); }

    revertX(this);

    if (!algorithm(paramsForCollision(this, other))) { return; }

    redoX(this);
    revertY(this);

    if (!algorithm(paramsForCollision(this, other))) { return; }

    revertX(this);
  }

  function revertX(entity) {
    entity.temporaryX = entity.x;
    entity.x = entity.previousX;
    return true;
  }

  function revertY(entity) {
    entity.temporaryY = entity.y;
    entity.y = entity.previousY;
    return true;
  }

  function redoX(entity) {
    entity.x = entity.temporaryX;
    return true;
  }

  function redoY(entity) {
    entity.y = entity.temporaryY;
    return true;
  }

  function paramsForCollision(entityA, entityB) {
    var params = {};
    params[entityA.type] = entityA;
    params[entityB.type] = entityB;
    return params;
  }

  function create(specs) {
    return _.extend({
      movable: true,
      velocityX: 0, velocityY: 0,
      undoLastMovement: undoLastMovement
    }, specs || {});
  }

  return create;
});
