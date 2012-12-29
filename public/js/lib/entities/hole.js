define(function () {

  function create(specs) {
    var hole = {};

    hole.type = 'hole';
    hole.x = 0;
    hole.y = 0;
    hole.width = 40;
    hole.height = 40;

    return _.extend(hole, specs || {});
  }

  return create;
});
