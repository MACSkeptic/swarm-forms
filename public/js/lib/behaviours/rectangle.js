define(function () {
  function minX() {
    return this.x - this.width / 2;
  }

  function maxX() {
    return this.x + this.width / 2;
  }

  function minY() {
    return this.y - this.height / 2;
  }

  function maxY() {
    return this.y + this.height / 2;
  }

  function create(specs) {
    return _.extend({ x: 0, y: 0, width: 100, height: 100,
      maxX: maxX, minX: minX, maxY: maxY, minY: minY
    }, specs || {});
  }

  return create;
});
