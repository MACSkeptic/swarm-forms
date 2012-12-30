define(['./shot'], function (shot) {

  function shootRight(params) {
    this.children.push(
      shot({
        x: this.x,
        y: this.y,
        velocityX: 10,
        update: function () {
          this.velocityY += (0.3 * (Math.random() * params.elapsed));
          this.velocityY -= (0.3 * (Math.random() * params.elapsed));
        }
      })
    );
  }

  function shootLeft(params) {
    this.children.push(
      shot({
        x: this.x,
        y: this.y,
        velocityX: -10,
        update: function () {
          this.velocityY += (0.3 * (Math.random() * params.elapsed));
          this.velocityY -= (0.3 * (Math.random() * params.elapsed));
        }
      })
    );
  }

  function shootDown(params) {
    this.children.push(
      shot({
        x: this.x,
        y: this.y,
        velocityY: 10,
        update: function () {
          this.velocityX += (0.3 * (Math.random() * params.elapsed));
          this.velocityX -= (0.3 * (Math.random() * params.elapsed));
        }
      })
    );
  }

  function create(specs) {
    var tower = {};

    tower.x = specs.x || 0;
    tower.y = specs.y || 0;
    tower.width = 30;
    tower.height = 30;
    tower.velocityX = 0;
    tower.velocityY = 0;
    tower.type = 'tower';
    tower.children = [];
    tower.rotation = 0;

    tower.shootRight = shootRight;
    tower.shootLeft = shootLeft;
    tower.shootDown = shootDown;
    tower.update = specs.update || update;

    return tower;
  }

  return create;
});
