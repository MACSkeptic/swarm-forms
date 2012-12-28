define(function () {

  function create(specs) {
    var boundaries = {}, specs = specs || {};

    boundaries.minX = specs.minX || 0;
    boundaries.minY = specs.minY || 0;
    boundaries.maxX = specs.maxX || window.innerWidth;
    boundaries.maxY = specs.maxY || window.innerHeight;
    boundaries.type = 'boundaries';

    return boundaries;
  }

  return create;
});
