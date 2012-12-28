define([
    '../entities/player',
    '../entities/boundaries'
  ],
  function (player, boundaries) {
    var entities = [
      player({ x: 50, y: 100 }),
      {
        x: 300,
        y: 300,
        width: 200,
        height: 200,
        type: 'square'
      },
      {
        x: 800,
        y: 000,
        width: 200,
        height: 200,
        type: 'square'
      },
      boundaries()
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
