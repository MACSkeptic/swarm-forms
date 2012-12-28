define([
    './renderers/canvas',
    './scenes/main_menu',
    './modifiers/movement',
    './modifiers/gravity',
    './modifiers/collision'
  ], 
  function (renderer, mainMenu, movement, gravity, collision) {
    var scenes = {},
        currentScene;

    function draw() {
      console.log('draw game');

      renderer.render(currentScene);
    }

    function update(elapsed) {
      console.log('update game, fps: ' + 1000/elapsed);

      currentScene.update(elapsed, this);

      _.each(currentScene.entities, function (currentEntity) {
        if (currentEntity.disposed) { return; }

        gravity.applyTo(currentEntity, elapsed);
        movement.applyTo(currentEntity, elapsed);
        currentEntity.update && currentEntity.update(elapsed);

        _.each(currentEntity.children || [], function (currentChild) {
          if (currentChild.disposed) { return; }

          gravity.applyTo(currentChild, elapsed, currentEntity);
          movement.applyTo(currentChild, elapsed, currentEntity);
          currentChild.update && currentChild.update(elapsed, currentEntity);

          _.each(currentScene.entities || [], function (targetEntity) {
            if (targetEntity === currentEntity) { return; }

            collision.applyTo(currentChild, targetEntity);

            _.each(targetEntity.children || [], function (targetChild) {
              collision.applyTo(currentChild, targetChild);
            });
          });
        });

        _.each(currentScene.entities, function (targetEntity) {
          collision.applyTo(currentEntity, targetEntity);
        });

        currentEntity.children = _.filter(currentEntity.children || [], function (child) {
          return !child.disposed;
        });
      });

      currentScene.entities = _.filter(currentScene.entities || [], function (entity) {
        return !entity.disposed;
      });
    }

    function handleInput() {
      console.log('handle input game');
    }

    function addScene(scene, current) {
      scenes[scene.name] = scene;

      if (current) { changeCurrentSceneTo(scene); }
    }

    function changeCurrentSceneTo(scene) { currentScene = scene; }

    function init(callback) {
      console.log('init game');
      
      collision.init(function () {
        renderer.init(function () {
          addScene(mainMenu, true);
          mainMenu.init(callback);
        });
      });
    }

    return {
      "init": init,
      "draw": draw,
      "update": update,
      "handleInput": handleInput
    };
  }
);
