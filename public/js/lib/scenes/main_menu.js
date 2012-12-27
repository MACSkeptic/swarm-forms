define([
  ],
  function () {
    var entities = [
      { "x": 10, "y": 20, "width": 30, "height": 40, "type": 'square' },
      { "x": 510, "y": 320, "width": 90, "height": 140, "type": 'triangle' },
      { "x": 100, "y": 200, "radius": 60, "type": 'circle', 
        "velocityX": 4, "velocityY": 0, "isAffectedByGravity": true }
    ];

    function init(callback) {
      console.log('init main menu');

      callback();
    }

    function update(elapsed) {
      console.log('update scene');
    }

    return {
      "init": init,
      "update": update,
      "entities": entities,
      "name": 'main menu'
    };
  }
);
