define(function () {
  var detectors = {};

  function canCollide(entityA, entityB) {
    return (entityA.collidesWith || {})[entityB.type];
  }

  function collided(entityA, entityB) {
    var params = {};
    params[entityA.type] = entityA;
    params[entityB.type] = entityB;
    return detector(entityA, entityB)(params);
  }

  function applyTo(entityA, entityB) {
    var aCanCollideWithB = canCollide(entityA, entityB),
        bCanCollideWithA = canCollide(entityB, entityA);

    if (!aCanCollideWithB && !bCanCollideWithA) { return; }

    if (collided(entityA, entityB)) {
      if (aCanCollideWithB) { entityA.collidesWith[entityB.type].apply(entityA, [entityB]); }
      if (bCanCollideWithA) { entityB.collidesWith[entityA.type].apply(entityB, [entityA]); }
    }
  }

  function detector(entityA, entityB) {
    var detectorA = detectors[entityA.type],
        detectorB = detectors[entityB.type];

    return (detectorA && detectorA[entityB.type]) || 
      (detectorB && detectorB[entityA.type]) ||
      function () {
        console.error(
          'could not find a detector for: ' +
          entityA.type + ', ' +
          entityB.type
        );
        return false;
      };
  }

  function shotAndSquare(entities) {
    var squareMinimumX = entities.square.x - entities.square.width/2,
        squareMinimumY = entities.square.y - entities.square.height/2,
        squareMaximumX = entities.square.x + entities.square.width/2,
        squareMaximumY = entities.square.y + entities.square.height/2;

    return entities.shot.x >= squareMinimumX && entities.shot.x <= squareMaximumX &&
      entities.shot.y >= squareMinimumY && entities.shot.y <= squareMaximumY;

  }

  function playerAndShot(entities) {
    return false;
  }

  function setupDetectors() {
    detectors.player = {};
    detectors.shot = {};
    detectors.square = {};

    detectors.player.shot = playerAndShot;
    detectors.shot.player = playerAndShot;

    detectors.square.shot = shotAndSquare;
    detectors.shot.square = shotAndSquare;
  }

  function init(callback) {
    setupDetectors();
    callback();
  }

  return {
    "applyTo": applyTo,
    "init": init
  };
});
