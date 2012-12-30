define(['../../behaviours/shoots'], function (shoots) {
  function update(params) {
  }

  function create(specs) {
    var tower = {};

    tower.x = 0;
    tower.y = 0;
    tower.width = 25;
    tower.height = 25;
    tower.velocityX = 0;
    tower.velocityY = 0;
    tower.shotSpeed = 10;
    tower.timeRequiredBetweenShots = 100;
    tower.isMovable = false;
    tower.type = 'tower';

    return shoots(_.extend(tower, specs || {}));
  }

  return create;
});
