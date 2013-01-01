define(function () {

  function create(specs) {
    return _.extend({
      minX: 0, maxX: 1280, minY: 0, maxY: 720
    }, specs || {});
  }

  return create;
});
