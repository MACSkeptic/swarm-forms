define(function (require) {
  return {
    turret: require('./enemies/turret'),
    superTurret: require('./enemies/super_turret'),
    wanderer: require('./enemies/wanderer'),
    chaser: require('./enemies/chaser')
  };
});
