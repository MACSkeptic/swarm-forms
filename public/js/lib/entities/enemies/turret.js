define(function(require) {
  var behaviours = require('../../behaviours'),
      circle = behaviours.circle,
      shoots = behaviours.shoots,
      findTarget = require('../../utils/find_target');

  function update(params) {
    targetAndShoot(findTarget.ofType('player', [
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
    return _.extend(
      shoots({ update: update, shotVelocity: 1, timeRequiredBetweenShots: 500 }),
      circle({ radius: 10 }),
      { type: 'turret', enemy: true },
      specs || {}
    );
  }

  return create;
});
