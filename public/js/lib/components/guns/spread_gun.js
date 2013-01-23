define(['../../utils/geometry', '../../entities/shot', './basic_gun'], function (geometry, shot, basicGun) {
  
  function createShot() {
    var velocity = [];
    velocity[0] = geometry.createVector2dFromPointAndModule({x: this.shotVelocityX, y: this.shotVelocityY }, {x: -1, y: 0}, this.shotVelocity);
    velocity[1] = geometry.createVector2dFromPointAndModule({x: this.shotVelocityX, y: this.shotVelocityY }, {x: 1, y: 0}, this.shotVelocity);
    velocity[2] = geometry.createVector2dFromPointAndModule({x: this.shotVelocityX, y: this.shotVelocityY }, {x: 0, y: -1}, this.shotVelocity);
    velocity[3] = geometry.createVector2dFromPointAndModule({x: this.shotVelocityX, y: this.shotVelocityY }, {x: 0, y: 1}, this.shotVelocity);

    var shotSpecs = {
      x: (this.owner.x + 10 || 0),
      y: (this.owner.y + 10 || 0),
      velocityX: velocity[0].x + (this.owner.velocityX || 0),
      velocityY: velocity[0].y + (this.owner.velocityY || 0),
      enemy: this.enemy
    };

    var shotSpecs2 = {
      x: (this.owner.x - 10 || 0),
      y: (this.owner.y - 10 || 0),
      velocityX: velocity[1].x + (this.owner.velocityX || 0),
      velocityY: velocity[1].y + (this.owner.velocityY || 0),
      enemy: this.enemy
    };

    var shotSpecs3 = {
      x: (this.owner.x + 20 || 0),
      y: (this.owner.y + 20 || 0),
      velocityX: velocity[2].x + (this.owner.velocityX || 0),
      velocityY: velocity[2].y + (this.owner.velocityY || 0),
      enemy: this.enemy
    };

    var shotSpecs4 = {
      x: (this.owner.x - 20 || 0),
      y: (this.owner.y - 20 || 0),
      velocityX: velocity[3].x + (this.owner.velocityX || 0),
      velocityY: velocity[3].y + (this.owner.velocityY || 0),
      enemy: this.enemy
    };

    this.owner.children.push(shot(shotSpecs));
    this.owner.children.push(shot(shotSpecs2));
    this.owner.children.push(shot(shotSpecs3));
    this.owner.children.push(shot(shotSpecs4));
  }

  function create(owner) {
    var gun = basicGun(owner);
    gun.timeRequiredBetweenShots = 600;
    gun.shotVelocity = 8;
    gun.shotVelocityX = 0;
    gun.shotVelocityY = 0;
    gun.setDirection('right');
    gun.createShot = createShot;
    return gun;
  }

  return create;
});