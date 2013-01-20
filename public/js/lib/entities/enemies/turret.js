define(function (require) {
  var guns = require('../../components/guns'),
      behaviours = require('../../behaviours'),
      circle = behaviours.circle,
      shoots = behaviours.shoots,
      findTarget = require('../../utils/find_target');

  function update(params) {
    targetAndShoot(findTarget.ofType('player').amongst([
      [params.currentScene.player],
      params.currentScene.players,
      params.currentScene.entities
    ]), this, params);
  }

  function targetAndShoot(target, origin, params) {
    if (!target) { return; }
    origin.shootAt(target, params);
  }

  function create(specs) {
    var turret = _.extend(
      shoots({ update: update }),
      circle({ radius: 10 }),
      { type: 'turret', enemy: true },
      specs || {}
    );

    turret.gun = guns.basic(turret);
    turret.gun.timeRequiredBetweenShots = 500;
    turret.gun.timeSinceLastShot = turret.gun.timeRequiredBetweenShots;
    turret.gun.shotVelocity = 1;
    turret.gun.enemy = true;
    return turret;
  }

  return create;
});
