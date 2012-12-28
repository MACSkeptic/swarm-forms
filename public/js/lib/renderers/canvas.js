define([
  ],
  function () {
    var width,
        height,
        backgroundCanvas,
        foregroundCanvas,
        backgroundContext,
        foregroundContext,
        dummyCanvas,
        dummyContext,
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

      var currentCanvas = dummyCanvas,
          currentContext = dummyContext;

      dummyContext.clearRect(0, 0, width, height);

      _.each(scene.entities, function (currentEntity) {
        if (currentEntity.disposed) { return; }

        rendererFor(currentEntity)(currentContext, currentEntity);

        _.each(currentEntity.children || [], function (currentChild) {
          if (currentChild.disposed) { return; }

          rendererFor(currentChild)(currentContext, currentChild, currentEntity);
        });
      });

      foregroundContext.clearRect(0, 0, width, height);
      foregroundContext.drawImage(currentCanvas, 0, 0);
    }

    function setupRenderers() {
      renderers.player = function (context, entity) {
        var halfWidth = entity.width/2, halfHeight = entity.height/2;

        context.save();
        context.translate(-halfWidth + entity.x, -halfHeight + entity.y);

        context.fillStyle = 'orange';
        context.fillRect(0, 0, halfWidth*2, halfHeight*2);

        context.restore();

        context.fillStyle = 'yellow';
        context.beginPath();
        context.arc(entity.x, entity.y, halfWidth/2, 0 , 2 * Math.PI, true);
        context.closePath();
        context.fill();
      };

      renderers.shot = function (context, entity, parentEntity) {
        context.fillStyle = 'pink';
        context.beginPath();
        context.arc(entity.x, entity.y, entity.radius, 0 , 2 * Math.PI, true);
        context.closePath();
        context.fill();
      };

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

      renderers.boundaries = function (context, entity) {
        return;
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
      dummyContext = contextOf(dummyCanvas);

      backgroundContext.fillStyle = "black";
      backgroundContext.fillRect(0, 0, width, height);
    }

    function init(callback) {
      console.log('init renderer');

      backgroundCanvas = createCanvas('background');
      foregroundCanvas = createCanvas('foreground');
      dummyCanvas = createCanvas('dummy');

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
