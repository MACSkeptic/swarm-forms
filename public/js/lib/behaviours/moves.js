define(function () {
  function undoLastMovement() {
    if (this.previousX === undefined || this.previousY === undefined) { return; }
    this.x = this.previousX;
    this.y = this.previousY;
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
