define(['../behaviours/rectangle'], function (rectangle) {
  function create(specs) {
    return rectangle(_.extend({
      width: 20, height: 20, type: 'rock'
    }, specs || {}));
  }

  return create;
});
