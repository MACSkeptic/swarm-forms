define([
    './renderers/canvas',
    './scenes/main_menu'
  ], 
  function (renderer, mainMenu) {
    var scenes = {},
        currentScene;

    function draw() {
      console.log('draw game');

      renderer.render(currentScene);
    }

    function update(elapsed) {
      console.log('update game, fps: ' + 1000/elapsed);

      currentScene.update(elapsed, this);
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
