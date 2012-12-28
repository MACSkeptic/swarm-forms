define([
    '../entities/player',
    '../entities/boundaries'
  ],
  function (player, boundaries) {
    var entities = [
      player({ x: 50, y: 300 }),
      player({ x: 1100, y: 350 }),
      player({ x: 500, y: 50 }),
      {
        x: 300,
        y: 000,
        width: 100,
        height: 100,
        type: 'square'
      },
      {
        x: 200,
        y: 550,
        width: 100,
        height: 100,
        type: 'square'
      },
      {
        x: 800,
        y: 100,
        width: 100,
        height: 100,
        type: 'square'
      },
      {
        x: 800,
        y: 500,
        width: 100,
        height: 100,
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

      if (Math.random() > 0.9) {
        entities[0].shootRight();
      }

      if (Math.random() > 0.9) {
        entities[1].shootLeft();
      }

      if (Math.random() > 0.9) {
        entities[2].shootDown();
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
