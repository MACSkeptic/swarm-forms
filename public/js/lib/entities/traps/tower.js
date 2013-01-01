define(['../../behaviours/shoots'], function (shoots) {
  function update(params) {
  }

  function create(specs) {
    var tower = {};

    tower.x = 0;
    tower.y = 0;
    tower.radius = 15;
    tower.velocityX = 0;
    tower.velocityY = 0;
    tower.shotVelocity = 2;
    tower.timeRequiredBetweenShots = 500;
    tower.isMovable = false;
    tower.type = 'tower';
    tower.enemy = true;
    tower.sprite = 'zeroStanding1';

    return shoots(_.extend(tower, specs || {}));
  }

  return create;
});
