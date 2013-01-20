define(['../entities/shot', '../utils/geometry'], function (shot, geometry) {
  
  function shootRight(params) {
    this.gun.setDirection('right');
    this.gun.shoot();
  }

  function shootLeft(params) {
    this.gun.setDirection('left');
    this.gun.shoot();
  }

  function shootDown(params) {
    this.gun.setDirection('down');
    this.gun.shoot();
  }

  function shootUp(params) {
    this.gun.setDirection('up');
    this.gun.shoot();
  }

  function shoot(params) {
    this.gun.shoot();
  }

  function shootAt(target, params) {
    this.gun.setDirection(target.x, target.y);
    this.gun.shoot();
  }

  function update(params) {
    this.timeSinceLastShot += params.elapsed;
    this.gun.update(params);
    if (this.timeSinceLastShot > 1000000) { this.timeSinceLastShot = 1000000; }
    this.childUpdate && this.childUpdate.apply(this, [params]);
  }

  function percentageToShootAgain() {
    return this.gun.percentageToShootAgain();
  }

  function create(specs) {
    var shoots = {};
    
    shoots.shotVelocity = 5;
    shoots.children = [];

    shoots.shootAt = shootAt;
    shoots.shoot = shoot;
    shoots.shootRight = shootRight;
    shoots.shootLeft = shootLeft;
    shoots.shootUp = shootUp;
    shoots.shootDown = shootDown;

    _.extend(shoots, specs || {});

    shoots.childUpdate = shoots.update;
    shoots.update = update;
    shoots.percentageToShootAgain = percentageToShootAgain;
    return shoots;
  }

  return create;
});
