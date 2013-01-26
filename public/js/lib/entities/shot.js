define(['../behaviours/circle', '../behaviours/moves', '../scenes/game_over'], function (circle, moves, gameOver) {

  function createSuperShot(shot) {
    shot.radius += this.radius;
    shot.velocityX += this.velocityX;
    shot.velocityY += this.velocityY;

    delete this.collidesWith.shot;
    this.disposed = true;
  }

  function outOfBounds() { this.disposed = true; }
  function vanish() { this.disposed = true; }

  function killAndVanish(other) {
    other.disposed = true;
    this.disposed = true;
  }

  function killCountScoreAndVanish(other, algorithm, currentScene) {
    killAndVanish.apply(this, [other, algorithm]);
    (currentScene.increaseScore || function () {})();
  }

  function youDied(other, algorithm, currentScene) {
    gameOver.init(function () {
      currentScene && currentScene.game.changeCurrentSceneTo(gameOver);
    });
  }

  function create(specs) {
    return _.extend(
      circle({ radius: 4 }),
      moves(),
      {
        type: 'shot',
        collidesWith: {
          boundaries: outOfBounds,
          shot: createSuperShot,
          rock: vanish,
          turret: killCountScoreAndVanish,
          wanderer: killCountScoreAndVanish,
          chaser: killCountScoreAndVanish,
          player: youDied,
          tower: vanish
        }
      }, specs || {}
    );
  }

  return create;
});
