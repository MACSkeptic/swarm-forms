define(['./shot'], function (shot) {

  function shootRight(params) {
    this.children.push( shotWithInertia(10, 0, this) );
  }

  function shootLeft(params) {
    this.children.push( shotWithInertia(-10, 0, this) );
  }

  function shootDown(params) {
    this.children.push( shotWithInertia(0, 10, this) );
  }

  function shootUp(params) {
    this.children.push( shotWithInertia(0, -10, this) );
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
  }

  function create(specs) {
    var player = {};

    player.x = 0;
    player.y = 0;
    player.width = 30;
    player.height = 30;
    player.velocityX = 0;
    player.velocityY = 0;
    player.isMovable = true;
    player.type = 'player';
    player.children = [];
    player.rotation = 0;

    player.shootRight = shootRight;
    player.shootLeft = shootLeft;
    player.shootDown = shootDown;
    player.shootUp = shootUp;
    player.update = update;

    return _.extend(player, specs || {});
  }

  return create;
});
