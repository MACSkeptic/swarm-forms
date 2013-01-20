define(function (require) {
  var behaviours = require('../../behaviours'),
      guns = require('../../components/guns'),
      circle = behaviours.circle,
      shoots = behaviours.shoots,
      chaser = require('./chaser');

  function update(params) {
    this.shoot(params);
  }

  function create(specs) {
    var superTurret = _.extend(
      shoots({ update: update }),
      circle({ radius: 30 }),
      { type: 'turret', enemy: true},
      specs || {}
    );
    superTurret.gun = guns.chaserCreator(superTurret);
    superTurret.gun.timeRequiredBetweenShots = 500;
    return superTurret;
  }

  return create;
});
