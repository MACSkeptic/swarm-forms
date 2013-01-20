define(['../../utils/geometry', '../../entities/shot'], function (geometry, shot) {

  function update(params) {
    this.timeSinceLastShot = this.timeSinceLastShot += params.elapsed;
  }

  function canShoot(elapsed) {
    return this.timeSinceLastShot >= this.timeRequiredBetweenShots;
  }

  function createShot() {
    var shotSpecs = {
      x: (this.owner.x || 0),
      y: (this.owner.y || 0),
      velocityX: this.shotVelocityX + (this.owner.velocityX || 0),
      velocityY: this.shotVelocityY + (this.owner.velocityY || 0),
      enemy: this.enemy
    };

    this.owner.children.push(shot(shotSpecs));
  }

  function shoot(elapsed) {
    if (this.canShoot()) {
      this.timeSinceLastShot = 0;
      this.createShot();
    }
  }

  function shootAt(x, y) {
    var vector = geometry.createVector2dFromPointAndModule({x: x, y: y}, this.owner, this.shotVelocity);
    this.shotVelocityX = vector.x;
    this.shotVelocityY = vector.y;
    shoot();
  }

  function percentageToShootAgain() {
    return Math.min(1, this.timeSinceLastShot / this.timeRequiredBetweenShots);
  }

  function setDirection() {
    var argument1 = arguments[0];
    var argument2 = arguments[1];

    if (arguments.length == 1) {
      switch (argument1) {
      case 'up':
        this.shotVelocityX = 0;
        this.shotVelocityY = -1 * this.shotVelocity;
        break;
      case 'down':
        this.shotVelocityX = 0;
        this.shotVelocityY = this.shotVelocity;
        break;
      case 'right':
        this.shotVelocityX = this.shotVelocity;
        this.shotVelocityY = 0;
        break;
      case 'left':
        this.shotVelocityX = -1 * this.shotVelocity;
        this.shotVelocityY = 0;
        break;
      }
    }

    else if (arguments.length == 2) {
      var vector = geometry.createVector2dFromPointAndModule({x: argument1, y: argument2}, this.owner, this.shotVelocity);
      this.shotVelocityX = vector.x;
      this.shotVelocityY = vector.y;
    }
  }

  function create(owner, specs) {
    var basicGun = {};
    basicGun.timeRequiredBetweenShots = 100;
    basicGun.timeSinceLastShot = basicGun.timeRequiredBetweenShots;

    basicGun.shotVelocity = 5;
    basicGun.shotVelocityX = 0;
    basicGun.shotVelocityY = 0;
    
    basicGun.owner = owner;
    
    basicGun.canShoot = canShoot;
    basicGun.shoot = shoot;
    basicGun.shootAt = shootAt;
    basicGun.setDirection = setDirection;
    basicGun.update = update;
    basicGun.createShot = createShot;
    basicGun.percentageToShootAgain = percentageToShootAgain;
    _.extend(basicGun, specs);

    setDirection('right');
    return basicGun;
  }

  return create;
});