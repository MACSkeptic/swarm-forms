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

      dummyContext.lineWidth = 3;

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

        context.translate(entity.x, entity.y);

        context.strokeStyle = 'orange';

        context.save();
        context.rotate(entity.rotation);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth*2, halfHeight*2);
        context.restore();

        context.save();
        context.rotate(-entity.rotation);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth*2, halfHeight*2);
        context.restore();

        context.fillStyle = 'yellow';
        context.beginPath();
        context.arc(0, 0, halfWidth/2, 0 , 2 * Math.PI, true);
        context.closePath();
        context.fill();

        context.restore();
      };

      renderers.shot = function (context, entity, parentEntity) {
        context.fillStyle = 'cyan';
        context.strokeStyle = 'cyan';
        context.beginPath();
        context.arc(entity.x, entity.y, entity.radius, 0 , 2 * Math.PI, true);
        context.closePath();
        if (Math.random() >= 0.5) {
          context.fill();
        } else {
          context.stroke();
        }
      };

      renderers.square = function (context, entity) {
        context.fillStyle = 'red';
        context.strokeStyle = 'red';
        entity.step = entity.step || 0;
        entity.delta = entity.delta || 0.1;
        entity.step = entity.step + entity.delta;

        if (entity.step > 5) {
          entity.delta = -0.1;
        }

        if (entity.step <= 1) {
          entity.delta = 0.1;
        }


        context.fillStyle = 'purple';
        context.fillRect(entity.x, entity.y, entity.width, entity.height);

        context.save();
        context.fillStyle = 'red';
        context.translate(entity.x + entity.width/2, entity.y + entity.height/2);
        context.scale(1/entity.step, 1/entity.step);
        context.rotate(Math.PI/2/entity.step);
        context.fillRect(-entity.width/2, -entity.height/2, entity.width, entity.height);
        context.restore();
      };

      renderers.menuBackground = function (context, entity) {
        context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        context.fillRect(0, 0, width, height);
      };

      renderers.menuTitle = function (context, entity) {
        context.font = '40pt Monaco, Consolas, Monospaced';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'yellow';
        context.fillText(entity.text, width/2, 50);
      };

      renderers.menuItem = function (context, entity) {
        var x = width/2, y = 150 + 50 * entity.index;

        if (entity.selected) {
          context.fillStyle = 'black';
          context.fillRect(0, y - 25, width, 50);
        }

        context.font = '30pt Monaco, Consolas, Monospaced';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'cyan';
        context.fillText(entity.text, x, y);

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
