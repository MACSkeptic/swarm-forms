define([
    '../entities/player'
  ],
  function (player) {
    var entities = [
      player({ x: 50, y: 100 })
    ];

    function init(callback) {
      console.log('init main menu');

      callback();
    }

    function update(elapsed) {
      console.log('update scene');

      if (Math.random() > 0.8) {
        entities[0].shootRight();
      }
    }

    return {
      "init": init,
      "update": update,
      "entities": entities,
      "name": 'main menu'
    };
  }
);
