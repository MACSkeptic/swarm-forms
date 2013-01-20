define(['../../behaviours/shoots', '../../behaviours/circle'], '../../../components/guns.js', function (shoots, circle, guns) {

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
    tower.isMovable = false;
    tower.type = 'tower';
    tower.enemy = true;
    tower.sprite = 'zeroStanding1';
    
    tower = shoots(circle(_.extend(tower, specs || {})));
    tower.gun = guns.simple(tower);
    tower.gun.timeRequiredBetweenShots = 2000;
    return tower;
  }

  return create;
});
