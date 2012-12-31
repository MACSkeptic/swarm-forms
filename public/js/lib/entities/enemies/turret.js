define(function(require) {
  var behaviours = require('../../behaviours'),
      circle = behaviours.circle,
      shoots = behaviours.shoots;


  function update(params) {
    if (params.currentScene.player) {
      this.shootAt(params.currentScene.player(), params);
    }
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
