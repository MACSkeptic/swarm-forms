define(['../../utils/geometry', '../../entities/shot', './basic_gun'], function (geometry, shot, basicGun) {
  
  function createShot() {
    var shotSpecs = {
      x: (this.owner.x + 10 || 0),
      y: (this.owner.y + 10 || 0),
      velocityX: this.shotVelocityX + (this.owner.velocityX || 0),
      velocityY: this.shotVelocityY + (this.owner.velocityY || 0),
      enemy: this.enemy
    };

    var shotSpecs2 = {
      x: (this.owner.x - 10 || 0),
      y: (this.owner.y - 10 || 0),
      velocityX: this.shotVelocityX + (this.owner.velocityX || 0),
      velocityY: this.shotVelocityY + (this.owner.velocityY || 0),
      enemy: this.enemy
    };

    this.owner.children.push(shot(shotSpecs));
    this.owner.children.push(shot(shotSpecs2));
  }

  function create(owner) {
    var gun = basicGun(owner);
    gun.timeRequiredBetweenShots = 500;
    gun.shotVelocity = 8;
    gun.shotVelocityX = 0;
    gun.shotVelocityY = 0;
    gun.setDirection('right');
    gun.createShot = createShot;
    return gun;
  }

  return create;
});