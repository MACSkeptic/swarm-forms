define(function (require) {
  require('./entities/rock_test');
  require('./entities/player_test');
  require('./entities/enemies/turret_test');

  QUnit.start();
});
