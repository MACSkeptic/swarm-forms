define(['../../behaviours/shoots', '../../behaviours/circle', '../../components/guns'], function (shoots, circle, guns) {

  function update(params) {
    
  }

  function create(specs) {
    var tower = {};

    tower.x = 0;
    tower.y = 0;
    tower.radius = 15;
    tower.velocityX = 0;
    tower.velocityY = 0;
    tower.isMovable = false;
    tower.type = 'tower';
    tower.enemy = true;
    
    tower = shoots(circle(_.extend(tower, specs || {})));
    tower.gun = guns.basic(tower);
    tower.gun.shotVelocity = 7;
    tower.gun.timeRequiredBetweenShots = 50;

    return tower;
  }

  return create;
});
