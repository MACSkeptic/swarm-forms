define([
  ],
  function () {
    var width,
        height,
        backgroundCanvas,
        foregroundCanvas,
        backgroundContext,
        foregroundContext;

    function createCanvas(id) {
      return $('<canvas>', { "id": id, "width": width, "height": height } )[0];
    }

    function contextOf(canvas) {
      return canvas.getContext('2d');
    }

    function render(scene) {
      console.log('render: ' + scene);

      var currentCanvas = createCanvas('current'),
          currentContext = contextOf(currentCanvas);

      _.each(scene.entities(), function (entity) {
        currentContext.fillStyle = "red";
        currentContext.fillRect(
          entity.x,
          entity.y,
          entity.width,
          entity.height
        );
      });

      foregroundContext.clearRect(0, 0, width, height);
      foregroundContext.drawImage(currentCanvas, 0, 0);
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      reset();
    }

    function reset() {
      $(backgroundCanvas).attr({ "width": width, "height": height });
      $(foregroundCanvas).attr({ "width": width, "height": height });

      backgroundContext = contextOf(backgroundCanvas);
      foregroundContext = contextOf(foregroundCanvas);
    }

    function init(callback) {
      console.log('init renderer');

      backgroundCanvas = createCanvas('background');
      foregroundCanvas = createCanvas('foreground');

      $('body').append(backgroundCanvas).append(foregroundCanvas);

      resize();
      $(window).resize(resize);

      callback();
    }

    return {
      "render": render,
      "init": init
    };
  }
);
