define(function () {
  function minX() {
    return this.x - this.radius;
  }

  function maxX() {
    return this.x + this.radius;
  }

  function minY() {
    return this.y - this.radius;
  }

  function maxY() {
    return this.y + this.radius;
  }

  function create(specs) {
    return _.extend({ x: 0, y: 0, radius: 50, collidesLike: 'circle',
      maxX: maxX, minX: minX, maxY: maxY, minY: minY
    }, specs || {});
  }

  return create;
});
