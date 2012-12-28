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

  function shootLeft() {
    this.children.push(
      shot({
        x: this.x,
        y: this.y,
        velocityX: -10,
        update: function (elapsed) {
          this.velocityY += (0.3 * (Math.random() * elapsed));
          this.velocityY -= (0.3 * (Math.random() * elapsed));
        }
      })
    );
  }

  function shootDown() {
    this.children.push(
      shot({
        x: this.x,
        y: this.y,
        velocityY: 10,
        update: function (elapsed) {
          this.velocityX += (0.3 * (Math.random() * elapsed));
          this.velocityX -= (0.3 * (Math.random() * elapsed));
        }
      })
    );
  }

  function update(elapsed) {
    this.rotation += elapsed/200;

    if (this.rotation > Math.PI * 2) {
      this.rotation = 0;
    }
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
    player.rotation = 0;

    player.shootRight = shootRight;
    player.shootLeft = shootLeft;
    player.shootDown = shootDown;
    player.update = specs.update || update;

    return player;
  }

  return create;
});
