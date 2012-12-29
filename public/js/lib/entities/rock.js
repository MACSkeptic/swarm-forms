define(function () {

  function create(specs) {
    var rock = {};

    rock.type = 'rock';
    rock.x = 0;
    rock.y = 0;
    rock.width = 20;
    rock.height = 20;

    return _.extend(rock, specs || {});
  }

  return create;
});
