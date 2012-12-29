define(['./shot'], function (shot) {

  function shootRight(params) {
    if (!this.canShoot()) { return; }
    this.children.push( shotWithInertia(5, 0, this) );
    this.timeSinceLastShot = 0;
  }

  function shootLeft(params) {
    if (!this.canShoot()) { return; }
    this.children.push( shotWithInertia(-5, 0, this) );
    this.timeSinceLastShot = 0;
  }

  function shootDown(params) {
    if (!this.canShoot()) { return; }
    this.children.push( shotWithInertia(0, 5, this) );
    this.timeSinceLastShot = 0;
  }

  function shootUp(params) {
    if (!this.canShoot()) { return; }
    this.children.push( shotWithInertia(0, -5, this) );
    this.timeSinceLastShot = 0;
  }

  function canShoot() {
    return this.timeSinceLastShot > this.timeRequiredBetweenShots;
  }

  function shotWithInertia(velocityX, velocityY, that) {
    return shot({
      x: that.x,
      y: that.y,
      velocityX: velocityX + that.velocityX,
      velocityY: velocityY + that.velocityY
    });
  }

  function update(params) {
    this.rotation += params.elapsed/200;

    if (this.rotation > Math.PI * 2) {
      this.rotation = 0;
    }

    this.timeSinceLastShot += params.elapsed;

    if (this.timeSinceLastShot > 100000) { this.timeSinceLastShot = 100000; }
  }

  function percentageToShootAgain() {
    return Math.min(1, this.timeSinceLastShot / this.timeRequiredBetweenShots);
  }

  function create(specs) {
    var player = {};

    player.x = 0;
    player.y = 0;
    player.width = 30;
    player.height = 30;
    player.velocityX = 0;
    player.velocityY = 0;
    player.timeSinceLastShot = 100000;
    player.timeRequiredBetweenShots = 250;
    player.isMovable = true;
    player.type = 'player';
    player.children = [];
    player.rotation = 0;

    player.shootRight = shootRight;
    player.shootLeft = shootLeft;
    player.shootDown = shootDown;
    player.shootUp = shootUp;
    player.update = update;
    player.canShoot = canShoot;
    player.percentageToShootAgain = percentageToShootAgain;

    return _.extend(player, specs || {});
  }

  return create;
});
