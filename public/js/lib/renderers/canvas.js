define(function (require) {
    var backgroundCanvas,
        foregroundCanvas,
        backgroundContext,
        foregroundContext,
        dummyCanvas,
        dummyContext,
        renderers = {},
        textures = require('../assets/textures'),
        sprites = require('../assets/sprites');

    function createCanvas(id) {
      return $('<canvas>', { 'id': id })[0];
    }

    function contextOf(canvas) {
      var context = canvas.getContext('2d');
      $(canvas).attr({ 'width': window.innerWidth, 'height': window.innerHeight });
      return context;
    }

    function rendererFor(entity) {
      return renderers[entity.type] || function () {
        console.error('could not find renderer for: ' + entity.type);
      };
    }

    function render(scene) {
      var currentCanvas = dummyCanvas,
          currentContext = dummyContext;

      dummyContext.clearRect(0, 0, currentCanvas.width, currentCanvas.height);

      dummyContext.lineWidth = 3;

      dummyContext.save();
      var widthRatio = 0;
      var heightRatio = 0;

      heightRatio = currentCanvas.height / scene.height;
      widthRatio = currentCanvas.width / scene.width;
      dummyContext.scale(widthRatio, heightRatio);
      dummyContext.capStyle = 'round';
      dummyContext.joinStyle = 'round';

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
        var halfWidth = entity.width / 2, halfHeight = entity.height / 2;

        context.save();

        context.translate(entity.x + 7, entity.y + 7);

        context.strokeStyle = 'rgba(120, 120, 120, 0.4)';

        context.save();
        context.rotate(entity.rotation);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.save();
        context.rotate(-entity.rotation);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.fillStyle = 'rgba(120, 120, 120, 0.4)';
        context.lineWidth = 1;
        context.strokeStyle = 'rgba(120, 120, 120, 0.4)';
        context.beginPath();
        context.save();
        context.arc(0, 0, halfWidth / 2, 0, 2 * Math.PI, true);
        context.restore();
        context.closePath();
        context.fill();
        context.beginPath();
        context.arc(0, 0, halfWidth / 2, 0, 2 * Math.PI, true);
        context.closePath();
        context.stroke();

        context.restore();

        context.save();

        context.translate(entity.x, entity.y);

        context.strokeStyle = 'orange';

        context.save();
        context.rotate(entity.rotation);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.save();
        context.rotate(-entity.rotation);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.fillStyle = 'cyan';
        context.lineWidth = 1;
        context.strokeStyle = '#abcdef';
        context.beginPath();
        context.save();
        context.scale(entity.percentageToShootAgain(), entity.percentageToShootAgain());
        context.arc(0, 0, halfWidth / 2, 0, 2 * Math.PI, true);
        context.restore();
        context.closePath();
        context.fill();
        context.beginPath();
        context.arc(0, 0, halfWidth / 2, 0, 2 * Math.PI, true);
        context.closePath();
        context.stroke();

        context.restore();

        context.lineWidth = 3;
      };

      renderers.score = function (context, entity, scene) {
        var x = scene.width / 2, y = scene.height - 35;

        context.font = '25pt Monaco, Consolas, Monospaced';
        context.textAlign = 'right';
        context.textBaseline = 'middle';
        context.fillStyle = 'green';
        context.fillText(entity.score, x, y);
      };

      renderers.triggerToNextRoom = function (context, entity) {
        var gradient = context.createRadialGradient(
          entity.x,
          entity.y,
          entity.radius / 2,
          entity.x,
          entity.y,
          Math.max(
            entity.radius / 2,
            entity.radius - (entity.radius * entity.animationStep / 100)
          ) || entity.radius / 2
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
        context.fillStyle = 'rgba(120, 120, 120, 0.4)';
        context.beginPath();
        context.arc(entity.x + 3, entity.y + 3, entity.radius, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();

        if (entity.enemy) {
          context.fillStyle = 'red';
          context.strokeStyle = 'red';
        } else {
          context.fillStyle = 'cyan';
          context.strokeStyle = 'cyan';
        }
        context.beginPath();
        context.arc(entity.x, entity.y, entity.radius, 0, 2 * Math.PI, true);
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
        context.translate(entity.x + entity.width / 2, entity.y + entity.height / 2);
        context.scale(1 / entity.step, 1 / entity.step);
        context.rotate(Math.PI / 2 / entity.step);
        context.fillRect(-entity.width / 2, -entity.height / 2, entity.width, entity.height);
        context.restore();
      };

      renderers.menuBackground = function (context, entity, scene) {
        context.fillStyle = 'rgba(0, 0, 0, 1)';
        context.fillRect(0, 0, scene.width, scene.height);

        var halfWidth = 150, halfHeight = 150;

        context.save();

        context.translate(400, 450);

        context.strokeStyle = 'rgba(120, 120, 120, 0.3)';
        context.lineWidth = 20;

        context.save();
        context.rotate(entity.rotation);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.save();
        context.rotate(entity.rotation / 2);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.save();
        context.rotate(-entity.rotation / 2);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.save();
        context.rotate(-entity.rotation);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.lineWidth = 7;
        context.fillStyle = 'rgba(120, 120, 120, 0.3)';
        context.strokeStyle = 'rgba(120, 120, 120, 0.3)';
        context.beginPath();
        context.save();
        context.arc(0, 0, halfWidth / 2, 0, 2 * Math.PI, true);
        context.restore();
        context.closePath();
        context.fill();

        context.restore();

        context.save();

        context.translate(300, 350);

        context.strokeStyle = 'orange';
        context.lineWidth = 20;

        context.globalCompositeOperation = 'lighter';
        context.save();
        context.rotate(entity.rotation);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.save();
        context.rotate(entity.rotation / 2);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.save();
        context.rotate(-entity.rotation / 2);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.save();
        context.rotate(-entity.rotation);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.lineWidth = 7;
        context.fillStyle = 'cyan';
        context.strokeStyle = '#abcdef';
        context.beginPath();
        context.save();
        context.arc(0, 0, halfWidth / 2, 0, 2 * Math.PI, true);
        context.restore();
        context.closePath();
        context.fill();
        context.beginPath();
        context.arc(0, 0, halfWidth / 2, 0, 2 * Math.PI, true);
        context.closePath();
        context.stroke();

        context.restore();

        context.lineWidth = 3;
      };

      renderers.menuTitle = function (context, entity, scene) {
        context.font = '40pt Monaco, Consolas, Monospaced';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        context.fillStyle = 'rgba(120, 120, 120, 0.3)';
        context.fillText(entity.text, scene.width / 2 + 20, 50 + 20);

        context.fillStyle = 'yellow';
        context.fillText(entity.text, scene.width / 2, 50);
      };

      renderers.menuItem = function (context, entity, scene) {
        var x = scene.width / 2, y = 150 + 50 * entity.index;

        if (entity.selected) {
          context.save();
          context.globalCompositeOperation = 'lighter';
          context.fillStyle = 'rgba(255, 255, 255, 0.2)';
          context.fillRect(0, y - 25, scene.width, 50);
          context.restore();
        }

        context.font = '30pt Monaco, Consolas, Monospaced';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'cyan';
        context.fillText(entity.text, x, y);

      };

      renderers.helpText = function (context, entity, scene) {
        var x = scene.width / 2, y = scene.height - 35;

        context.font = '25pt Monaco, Consolas, Monospaced';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#0f9';
        context.fillText(entity.text, x, y);

      };

      renderers.circle = function (context, entity) {
        context.fillStyle = 'blue';
        context.beginPath();
        context.arc(entity.x, entity.y, entity.radius, 0, 2 * Math.PI, true);
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
        context.fillStyle = context.createPattern(textures.woodenFloor, 'repeat');
        context.fillRect(0, 0, scene.width, scene.height);
      };

      renderers.gameOver = function (context, entity, scene) {
        context.save();
        context.scale(2.2, 1.5);
        context.fillStyle = context.createPattern(textures.gameOver, 'no-repeat');
        context.fillRect(0, 0, scene.width, scene.height);
        context.restore();
      };

      renderers.hole = function (context, entity, scene) {
        context.fillStyle = context.createPattern(textures.lava, 'repeat');
        context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        context.lineWidth = 5;
        context.fillRect(entity.minX(), entity.minY(), entity.width, entity.height);
        context.strokeRect(entity.minX(), entity.minY(), entity.width, entity.height);
        context.lineWidth = 3;
      };

      renderers.rock = function (context, entity, scene) {
        context.fillStyle = context.createPattern(textures.rock, 'repeat');
        context.fillRect(entity.minX(), entity.minY(), entity.width, entity.height);
      };

      renderers.chaser = function (context, entity, scene) {
        context.save();
        context.translate(entity.x, entity.y);
        context.rotate(entity.rotation);
        context.fillStyle = 'magenta';
        context.fillRect(-entity.width / 2, -entity.height / 2, entity.width, entity.height);
        context.restore();
      };

      renderers.turret = function (context, entity, scene) {
        context.save();
        context.translate(entity.x, entity.y);
        context.strokeStyle = 'purple';
        context.fillStyle = 'red';
        context.lineWidth = 3;
        context.beginPath();
        context.save();
        context.scale(entity.percentageToShootAgain(), entity.percentageToShootAgain());
        context.arc(0, 0, entity.radius, 0, 2 * Math.PI, true);
        context.restore();
        context.closePath();
        context.fill();
        context.beginPath();
        context.arc(0, 0, entity.radius, 0, 2 * Math.PI, true);
        context.closePath();
        context.stroke();
        context.restore();

        context.lineWidth = 3;
      };

      renderers.tower = function (context, entity, scene) {
        context.save();
        context.translate(entity.x, entity.y);
        context.strokeStyle = 'purple';
        context.fillStyle = 'red';
        context.lineWidth = 3;
        context.beginPath();
        context.save();
        context.scale(entity.percentageToShootAgain(), entity.percentageToShootAgain());
        context.arc(0, 0, entity.radius, 0, 2 * Math.PI, true);
        context.restore();
        context.closePath();
        context.fill();
        context.beginPath();
        context.arc(0, 0, entity.radius, 0, 2 * Math.PI, true);
        context.closePath();
        context.stroke();
        context.restore();

        context.lineWidth = 3;
      };

      renderers.areaTrigger = function (context, entity, scene) {
        var halfWidth = entity.width / 2, halfHeight = entity.height / 2;

        context.save();

        context.translate(entity.x, entity.y);

        context.strokeStyle = 'white';

        context.save();

        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();

        context.save();
        context.rotate(-entity.rotation);
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();
        context.restore();
      };

      renderers.wanderer = function (context, entity, scene) {
        var halfWidth = entity.width / 2, halfHeight = entity.height / 2;

        context.save();
        context.translate(entity.x, entity.y);
        context.rotate(entity.rotation);
        context.strokeStyle = 'rgba(150, 150, 255, 1)';
        context.strokeRect(-halfWidth, -halfHeight, halfWidth * 2, halfHeight * 2);
        context.restore();
      };

      renderers.sprite = function (context, entity, scene) {
        var texture = textures[sprites[entity.sprite].texture];
        var sprite = sprites[entity.sprite];

        context.drawImage(
          texture,
          sprite.x, sprite.y, sprite.width, sprite.height,
          entity.x, entity.y, sprite.width, sprite.height
        );
      };

      renderers.spriteActor = function (context, entity, scene) {
        var texture = textures[sprites[entity.currentSprite()].texture];
        var sprite = sprites[entity.currentSprite()];

        context.drawImage(
          texture,
          sprite.x, sprite.y, sprite.width, sprite.height,
          entity.x, entity.y, sprite.width, sprite.height
        );
      };
    }

    function resize() {
      reset();
    }

    function reset() {
      backgroundContext = contextOf(backgroundCanvas);
      foregroundContext = contextOf(foregroundCanvas);
      dummyContext = contextOf(dummyCanvas);

      backgroundContext.fillStyle = 'black';
      backgroundContext.fillRect(0, 0,  window.innerWidth, window.innerHeight);
    }

    function init(callback) {
      backgroundCanvas = createCanvas('background');
      foregroundCanvas = createCanvas('foreground');
      dummyCanvas = createCanvas('dummy');

      $('body').append(backgroundCanvas).append(foregroundCanvas);

      resize();
      $(window).resize(resize);

      setupRenderers();

      textures.load(function () {
        $('#loading').remove();
        callback();
      });
    }

    return {
      'render': render,
      'init': init
    };
  }
);
