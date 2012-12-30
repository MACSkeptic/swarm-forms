define(['../entities/shot'], function (shot) {
  function shootRight(params) {
    shootWithVelocity.apply(this, [this.shotVelocity, 0]);
  }

  function shootLeft(params) {
    shootWithVelocity.apply(this, [-this.shotVelocity, 0]);
  }

  function shootDown(params) {
    shootWithVelocity.apply(this, [0, this.shotVelocity]);
  }

  function shootUp(params) {
    shootWithVelocity.apply(this, [0, -this.shotVelocity]);
  }

  function shootWithVelocity(velocityX, velocityY) {
    if (!canShoot.apply(this)) { return; }
    this.children.push( shotWithInertia.apply(this, arguments) );
    this.timeSinceLastShot = 0;
  }

  function shootAt(x, y, params) {
  }

  function update(params) {
    this.timeSinceLastShot += params.elapsed;
    if (this.timeSinceLastShot > 1000000) { this.timeSinceLastShot = 1000000; }
    this.childUpdate && this.childUpdate.apply(this, [params]);
  }

  function canShoot() {
    return percentageToShootAgain.apply(this) >= 0.99;
  }

  function percentageToShootAgain() {
    return Math.min(1, this.timeSinceLastShot / this.timeRequiredBetweenShots);
  }

  function shotWithInertia(velocityX, velocityY) {
    return shot({
      x: (this.x || 0), y: (this.y || 0),
      velocityX: velocityX + (this.velocityX || 0),
      velocityY: velocityY + (this.velocityY || 0),
      enemy: this.enemy
    });
  }

  function create(specs) {
    var shoots = {};

    shoots.velocityX = 0;
    shoots.velocityY = 0;
    shoots.timeSinceLastShot = 1000000;
    shoots.timeRequiredBetweenShots = 250;
    shoots.shotVelocity = 5;
    shoots.children = [];

    shoots.shootRight = shootRight;
    shoots.shootLeft = shootLeft;
    shoots.shootDown = shootDown;
    shoots.shootUp = shootUp;
    shoots.shootAt = shootAt;
    shoots.canShoot = canShoot;
    shoots.percentageToShootAgain = percentageToShootAgain;

    _.extend(shoots, specs || {});

    shoots.childUpdate = shoots.update;
    shoots.update = update;

    return shoots;
  }

  return create;
});