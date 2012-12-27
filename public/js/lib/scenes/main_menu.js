define([
  ],
  function () {

    function init(callback) {
      console.log('init main menu');

      callback();
    }

    function entities() {
      return [{
        "x": 10, "y": 20, "width": 30, "height": 40
      }];
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
