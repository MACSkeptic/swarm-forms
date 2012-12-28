define(['./shot'], function (shot) {

  function shootRight() {
    this.children.push(
      shot({
        x: this.x,
        y: this.y,
        velocityX: 10,
        update: function (elapsed) {
          this.velocityY += (0.3 * (Math.random() * elapsed));
          this.velocityY -= (0.3 * (Math.random() * elapsed));
        }
      })
    );
  }

  function create(specs) {
    var player = {};

    player.x = specs.x || 0;
    player.y = specs.y || 0;
    player.width = 30;
    player.height = 30;
    player.velocityX = 0;
    player.velocityY = 0;
    player.isMovable = true;
    player.type = 'player';
    player.children = [];

    player.shootRight = shootRight;

    return player;
  }

  return create;
});
