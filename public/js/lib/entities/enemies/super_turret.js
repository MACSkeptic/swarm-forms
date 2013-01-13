define(function (require) {
  var behaviours = require('../../behaviours'),
      circle = behaviours.circle,
      shoots = behaviours.shoots,
      chaser = require('./chaser');

  function update(params) {
    this.shoot(params);
  }

  function createShot(params) {
    return chaser({ x: this.x, y: this.y });
  }

  function create(specs) {
    return _.extend(
      shoots({ update: update, timeRequiredBetweenShots: 1000 }),
      circle({ radius: 30 }),
      { type: 'turret', enemy: true, createShot: createShot },
      specs || {}
    );
  }

  return create;
});
