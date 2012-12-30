define(function () {
  function minX() {
    return this.x - this.width;
  }

  function maxX() {
    return this.x + this.width;
  }

  function minY() {
    return this.y - this.height;
  }

  function maxY() {
    return this.y + this.height;
  }

  function create(specs) {
    return _.extend({ x: 0, y: 0, width: 100, height: 100 }, specs || {});
  }

  return create;
});
