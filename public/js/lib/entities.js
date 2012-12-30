define(function (require) {
  return {
    room:              require('./entities/room'),
    boundaries:        require('./entities/boundaries'),
    triggerToNextRoom: require('./entities/trigger_to_next_room'),
    player:            require('./entities/player'),
    enemies:           require('./entities/enemies')
  };
});
