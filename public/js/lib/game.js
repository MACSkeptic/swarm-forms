define([
    './renderers/canvas',
    './scenes/main_menu',
    './modifiers/movement',
    './modifiers/gravity'
  ], 
  function (renderer, mainMenu, movement, gravity) {
    var scenes = {},
        currentScene;

    var totalCount = 0;
    var badCount = 0;

    function draw() {
      console.log('draw game');

      renderer.render(currentScene);
    }

    function update(elapsed) {
      console.log('update game, fps: ' + 1000/elapsed);

      totalCount = totalCount + 1;

      if (1000/elapsed < 30) {
        badCount = badCount + 1;
        console.error(badCount*100/totalCount + '% bad framerate, now down to: ' + 1000/elapsed);
      } else if (1000/elapsed < 45) {
        console.warn('framerate down to: ' + 1000/elapsed);
      }

      currentScene.update(elapsed, this);
      _.each(currentScene.entities, function (currentEntity) {
        gravity.applyTo(currentEntity, elapsed);
        movement.applyTo(currentEntity, elapsed);
        currentEntity.update && currentEntity.update(elapsed);
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

      renderer.init(function () {
        addScene(mainMenu, true);
        mainMenu.init(callback);
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
