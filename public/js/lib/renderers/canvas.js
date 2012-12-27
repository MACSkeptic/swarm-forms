define([
  ],
  function () {
    var width,
        height,
        backgroundCanvas,
        foregroundCanvas,
        backgroundContext,
        foregroundContext,
        renderers = {};

    function createCanvas(id) {
      return $('<canvas>', { "id": id } )[0];
    }

    function contextOf(canvas) {
      var context = canvas.getContext('2d');
      $(canvas).attr({ "width": width, "height": height });
      return context;
    }

    function rendererFor(entity) {
      return renderers[entity.type];
    }

    function render(scene) {
      console.log('render: ' + scene);

      var currentCanvas = createCanvas('current'),
          currentContext = contextOf(currentCanvas);

      _.each(scene.entities, function (currentEntity) {
        rendererFor(currentEntity)(currentContext, currentEntity);
      });

      foregroundContext.clearRect(0, 0, width, height);
      foregroundContext.drawImage(currentCanvas, 0, 0);
    }

    function setupRenderers() {
      renderers.square = function (context, entity) {
        context.fillStyle = 'red';
        context.fillRect(entity.x, entity.y, entity.width, entity.height);
      };

      renderers.circle = function (context, entity) {
        context.fillStyle = 'blue';
        context.beginPath();
        context.arc(entity.x, entity.y, entity.radius, 0 , 2 * Math.PI, true);
        context.closePath();
        context.fill();
      };

      renderers.triangle = function (context, entity) {
        context.fillStyle = 'green';
        context.beginPath();
        context.save();
        context.translate(entity.x, entity.y);
        context.moveTo(0, 0);
        context.lineTo(0, entity.height);
        context.lineTo(entity.width, 0);
        context.restore();
        context.fill();
      };
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      reset();
    }

    function reset() {
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

      setupRenderers();

      callback();
    }

    return {
      "render": render,
      "init": init
    };
  }
);
