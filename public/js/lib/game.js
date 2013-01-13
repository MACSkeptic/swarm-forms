define(function (require) {
  var renderer = require('./renderers/canvas'),
      mainMenu = require('./scenes/main_menu'),
      movement = require('./modifiers/movement'),
      gravity = require('./modifiers/gravity'),
      collision = require('./modifiers/collision'),
      input = require('./input'),
      scenes = {},
      currentScene;

  function draw() {
    renderer.render(currentScene);
  }

  function update(elapsed) {
    var neatPackage = { input: input, elapsed: elapsed, game: this, currentScene: currentScene };

    handleInput(neatPackage);

    currentScene.update && currentScene.update(neatPackage);

    _.each(currentScene.entities, function (currentEntity) {
      if (currentEntity.disposed) { return; }

      gravity.applyTo(currentEntity, elapsed);
      movement.applyTo(currentEntity, elapsed);
      currentEntity.update && currentEntity.update(neatPackage);

      _.each(currentEntity.children || [], function (currentChild) {
        if (currentChild.disposed) { return; }

        gravity.applyTo(currentChild, elapsed, currentEntity);
        movement.applyTo(currentChild, elapsed, currentEntity);
        currentChild.update && currentChild.update(neatPackage);

        _.each(currentScene.entities || [], function (targetEntity) {
          if (targetEntity === currentEntity) { return; }

          collision.applyTo(currentChild, targetEntity, currentScene);

          _.each(targetEntity.children || [], function (targetChild) {
            collision.applyTo(currentChild, targetChild, currentScene);
          });
        });
      });

      _.each(currentScene.entities, function (targetEntity) {
        collision.applyTo(currentEntity, targetEntity, currentScene);
      });

      currentEntity.children = _.filter(currentEntity.children || [], function (child) {
        return !child.disposed;
      });
    });

    currentScene.entities = _.filter(currentScene.entities || [], function (entity) {
      return !entity.disposed;
    });
  }

  function handleInput(params) {
    if (params.input.keyPressed('esc')) { return params.game.changeCurrentSceneByName('main-menu'); }

    currentScene.handleInput && currentScene.handleInput(params);
  }

  function addScene(scene, current) {
    scenes[scene.name] = scene;

    if (current) { changeCurrentSceneTo(scene); }
  }

  function changeCurrentSceneTo(scene) { currentScene = scene; }
  function changeCurrentSceneByName(name) { currentScene = scenes[name]; }

  function init(callback) {
    collision.init(function () {
      renderer.init(function () {
        addScene(mainMenu, true);
        mainMenu.init(callback);
      });
    });
  }

  return {
    'init': init,
    'draw': draw,
    'update': update,
    'handleInput': handleInput,
    'changeCurrentSceneTo': changeCurrentSceneTo,
    'changeCurrentSceneByName': changeCurrentSceneByName,
    'addScene': addScene
  };
});
