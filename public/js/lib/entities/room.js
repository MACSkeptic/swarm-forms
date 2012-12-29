define(function () {

  function create(specs) {
    var room = {};

    room.type = 'room';


    return _.extend(room, specs || {});
  }

  return create;
});
