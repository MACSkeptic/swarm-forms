define(function () {

  function create(specs) {
    var boundaries = {}, specs = specs || {};

    boundaries.minX = specs.minX || 0;
    boundaries.minY = specs.minY || 0;
    boundaries.maxX = specs.maxX || 1280;
    boundaries.maxY = specs.maxY || 720;
    boundaries.type = 'boundaries';

    return boundaries;
  }

  return create;
});
