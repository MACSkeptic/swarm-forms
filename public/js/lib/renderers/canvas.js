define([
  ],
  function () {
    var backgroundCanvas,
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
      $(canvas).attr({ "width": window.innerWidth, "height": window.innerHeight });
      return context;
    }

    function rendererFor(entity) {
      return renderers[entity.type] || function () {
        console.error('could not find renderer for: ' + entity.type);
      };
    }

    function render(scene) {
      console.log('render: ' + scene);

      var currentCanvas = dummyCanvas,
          currentContext = dummyContext;

      dummyContext.clearRect(0, 0, currentCanvas.width, currentCanvas.height);

      dummyContext.lineWidth = 3;

      dummyContext.save();
      var widthRatio = 0;
      var heightRatio = 0;

      heightRatio = currentCanvas.height/scene.height;
      widthRatio = currentCanvas.width/scene.width;
      dummyContext.scale(widthRatio, heightRatio);

      _.each(scene.entities, function (currentEntity) {
        if (currentEntity.disposed) { return; }

        rendererFor(currentEntity)(currentContext, currentEntity, scene);

        _.each(currentEntity.children || [], function (currentChild) {
          if (currentChild.disposed) { return; }

          rendererFor(currentChild)(currentContext, currentChild, currentEntity);
        });
      });

      foregroundContext.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
      dummyContext.restore();
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

        context.fillStyle = 'cyan';
        context.lineWidth = 1;
        context.strokeStyle = '#abcdef';
        context.beginPath();
        context.save();
        context.scale(entity.percentageToShootAgain(), entity.percentageToShootAgain());
        context.arc(0, 0, halfWidth/2, 0 , 2 * Math.PI, true);
        context.restore();
        context.closePath();
        context.fill();
        context.beginPath();
        context.arc(0, 0, halfWidth/2, 0 , 2 * Math.PI, true);
        context.closePath();
        context.stroke();

        context.restore();

        context.lineWidth = 3;
      };

      renderers.triggerToNextRoom = function (context, entity) {
        var gradient = context.createRadialGradient(
          entity.x,
          entity.y,
          entity.radius/2,
          entity.x,
          entity.y,
          Math.max(
            entity.radius/2,
            entity.radius - (entity.radius * entity.animationStep/100)
          ) || entity.radius/2
        );
        gradient.addColorStop(0, '#ff0');
        gradient.addColorStop(1, 'transparent');
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(entity.x, entity.y, entity.radius, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
      };

      renderers.shot = function (context, entity, parentEntity) {
        context.fillStyle = 'cyan';
        context.strokeStyle = 'cyan';
        context.beginPath();
        context.arc(entity.x, entity.y, entity.radius, 0 , 2 * Math.PI, true);
        context.closePath();
        context.fill();
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

      renderers.menuBackground = function (context, entity, scene) {
        context.fillStyle = 'rgba(255, 255, 255, 0.2)';
        context.fillRect(0, 0, scene.width, scene.height);
      };

      renderers.menuTitle = function (context, entity, scene) {
        context.font = '40pt Monaco, Consolas, Monospaced';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'yellow';
        context.fillText(entity.text, scene.width/2, 50);
      };

      renderers.menuItem = function (context, entity, scene) {
        var x = scene.width/2, y = 150 + 50 * entity.index;

        if (entity.selected) {
          context.fillStyle = 'black';
          context.fillRect(0, y - 25, scene.width, 50);
        }

        context.font = '30pt Monaco, Consolas, Monospaced';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'cyan';
        context.fillText(entity.text, x, y);

      };

      renderers.helpText = function (context, entity, scene) {
        var x = scene.width/2, y = scene.height - 35;

        context.font = '25pt Monaco, Consolas, Monospaced';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#0f9';
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

      renderers.boundaries = function (context, entity) { return; };

      renderers.room = function (context, entity, scene) {
        var gradient = context.createRadialGradient(
            scene.width/2, scene.height/2, 0, scene.width/2, scene.height/2, 500);
        gradient.addColorStop(0, '#888');
        gradient.addColorStop(1, '#222');
        context.fillStyle = gradient;
        context.fillRect(0, 0, scene.width, scene.height);
      };

      renderers.hole = function (context, entity, scene) {
        context.save();
        context.translate(entity.x - entity.width/2, entity.y - entity.height/2);
        context.fillStyle = 'black';
        context.fillRect(0, 0, entity.width, entity.height);
        context.strokeStyle = '#222';
        context.strokeRect(0, 0, entity.width, entity.height);
        context.restore();
      };

      renderers.rock = function (context, entity, scene) {
        context.save();
        context.translate(entity.x - entity.width/2, entity.y - entity.height/2);
        context.fillStyle = 'brown';
        context.strokeStyle = 'red';
        context.fillRect(0, 0, entity.width, entity.height);
        context.strokeRect(0, 0, entity.width, entity.height);

        context.beginPath();
        context.moveTo(0, 0);
        context.bezierCurveTo(
          entity.width/7, 0,
          entity.width/3, entity.height/7,
          entity.width, entity.height);
        context.stroke();

        context.restore();
      };
    }

    function resize() {
      reset();
    }

    function reset() {
      backgroundContext = contextOf(backgroundCanvas);
      foregroundContext = contextOf(foregroundCanvas);
      dummyContext = contextOf(dummyCanvas);

      backgroundContext.fillStyle = "black";
      backgroundContext.fillRect(0, 0,  window.innerWidth, window.innerHeight);
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
