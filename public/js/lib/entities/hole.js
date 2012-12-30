define(['../behaviours/rectangle'], function (rectangle) {

  function create(specs) {
    return rectangle(_.extend({ type: 'hole', width: 40, height: 40}, specs || {}));
  }

  return create;
});
