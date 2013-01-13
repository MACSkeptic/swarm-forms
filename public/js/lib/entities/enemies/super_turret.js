define(function (require) {
  var behaviours = require('../../behaviours'),
      circle = behaviours.circle,
      shoots = behaviours.shoots,
      chaser = require('./chaser');

  function update(params) {
    if (this.canShoot()) {
      this.timeSinceLastShot = 0;
      this.children.push(chaser({ x: this.x, y: this.y }));
    }
  }

  function create(specs) {
    return _.extend(
      shoots({ update: update, timeRequiredBetweenShots: 1000 }),
      circle({ radius: 30 }),
      { type: 'turret', enemy: true },
      specs || {}
    );
  }

  return create;
});
