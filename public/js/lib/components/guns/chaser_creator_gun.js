define(['../../utils/geometry', '../../entities/enemies/chaser', './basic_gun'], function (geometry, chaser, basicGun) {
  
  function createShot() {
    var shotSpecs = {
      x: (this.owner.x || 0),
      y: (this.owner.y || 0),
      velocityX: this.shotVelocityX + (this.owner.velocityX || 0),
      velocityY: this.shotVelocityY + (this.owner.velocityY || 0),
      enemy: this.enemy
    };

    this.owner.children.push(chaser(shotSpecs));
  }

  function create(owner) {
    var gun = basicGun(owner);
    gun.timeRequiredBetweenShots = 100;
    gun.shotVelocity = 10;
    gun.shotVelocityX = 0;
    gun.shotVelocityY = 0;
    gun.setDirection('right');
    gun.createShot = createShot;
    return gun;
  }

  return create;
});