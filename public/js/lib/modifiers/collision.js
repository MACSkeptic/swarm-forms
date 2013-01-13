define(function () {
  var detectors = {};

  function canCollide(entityA, entityB) {
    return (entityA !== entityB) &&
      !entityA.disposed && !entityB.disposed &&
      (entityA.collidesWith || {})[entityB.type];
  }

  function collided(entityA, entityB) {
    var params = {};
    params[entityA.type] = entityA;
    params[entityB.type] = entityB;
    params[entityA.collidesLike] = entityA;
    params[entityB.collidesLike] = entityB;
    return detector(entityA, entityB)(params, entityA, entityB);
  }

  function applyTo(entityA, entityB, currentScene) {
    var aCanCollideWithB = canCollide(entityA, entityB),
        bCanCollideWithA = canCollide(entityB, entityA);

    if (!aCanCollideWithB && !bCanCollideWithA) { return; }

    if (collided(entityA, entityB)) {
      if (aCanCollideWithB) {
        entityA.collidesWith[entityB.type].apply(
          entityA, [entityB, detector(entityA, entityB), currentScene]);
      }
      if (bCanCollideWithA) {
        entityB.collidesWith[entityA.type].apply(
          entityB, [entityA, detector(entityA, entityB), currentScene]);
      }

      return true;
    }
  }

  function detector(entityA, entityB) {
    return typeSpecificDetector(entityA, entityB) ||
      mixedDetector(entityA, entityB) ||
      genericShapeDetector(entityA, entityB) ||
      function () {
        return console.error('could not find a detector for: ' + entityA.type + ', ' + entityB.type,
          'could not find a detector for: ' + entityA.collidesLike + ', ' + entityB.collidesLike) && false;
      };
  }

  function typeSpecificDetector(entityA, entityB) {
    var detectorA = detectors[entityA.type],
        detectorB = detectors[entityB.type];

    return (detectorA && detectorA[entityB.type]) || (detectorB && detectorB[entityA.type]);
  }

  function mixedDetector(entityA, entityB) {
    var detectorA = detectors[entityA.type],
        detectorB = detectors[entityB.type];

    return (detectorA && detectorA[entityB.collidesLike]) || (detectorB && detectorB[entityA.collidesLike]);
  }

  function genericShapeDetector(entityA, entityB) {
    var detectorA = detectors[entityA.collidesLike],
        detectorB = detectors[entityB.collidesLike];

    return (detectorA && detectorA[entityB.collidesLike]) || (detectorB && detectorB[entityA.collidesLike]);
  }

  function rectangleAndRectangle(ignore, entityA, entityB) {
    var bottomA = entityA.maxY(),
        bottomB = entityB.maxY(),
        leftA   = entityA.minX(),
        leftB   = entityB.minX(),
        rightA  = entityA.maxX(),
        rightB  = entityB.maxX(),
        topA    = entityA.minY(),
        topB    = entityB.minY();

    return !(leftA > rightB || leftB > rightA || topA > bottomB || topB > bottomA);
  }

  function circleAndRectangle(entities) {
    var cdx = Math.abs(entities.circle.x - entities.rectangle.x),
        cdy = Math.abs(entities.circle.y - entities.rectangle.y);

    if (cdx > (entities.rectangle.width / 2 + entities.circle.radius)) { return false; }
    if (cdy > (entities.rectangle.height / 2 + entities.circle.radius)) { return false; }

    if (cdx <= (entities.rectangle.width / 2)) { return true; }
    if (cdy <= (entities.rectangle.height / 2)) { return true; }

    return (
      Math.pow(cdx - entities.rectangle.width / 2, 2) +
      Math.pow(cdy - entities.rectangle.height / 2, 2)
    ) <= Math.pow(entities.circle.radius, 2);
  }

  function circleAndBoundaries(entities) {
    return entities.circle.minX() <= entities.boundaries.minX ||
      entities.circle.maxX() >= entities.boundaries.maxX ||
      entities.circle.minY() <= entities.boundaries.minY ||
      entities.circle.maxY() >= entities.boundaries.maxY;
  }

  function playerAndTriggerToNextRoom(entities) {
    return Math.abs(entities.player.x - 320) < 30 && Math.abs(entities.player.y - 200) < 30;
  }

  function playerAndBoundaries(entities) {
    return entities.player.minX() <= entities.boundaries.minX ||
      entities.player.maxX() >= entities.boundaries.maxX ||
      entities.player.minY() <= entities.boundaries.minY ||
      entities.player.maxY() >= entities.boundaries.maxY;
  }

  function rectangleAndBoundaries(entities) {
    return entities.rectangle.minX() <= entities.boundaries.minX ||
      entities.rectangle.maxX() >= entities.boundaries.maxX ||
      entities.rectangle.minY() <= entities.boundaries.minY ||
      entities.rectangle.maxY() >= entities.boundaries.maxY;
  }

  function circleAndCircle(ignore, circleA, circleB) {
    return (
      Math.pow(circleA.x - circleB.x, 2) +
      Math.pow(circleA.y - circleB.y, 2)
    ) <= Math.pow(circleA.radius + circleB.radius, 2);
  }

  function setupDetectors() {
    addDetector('boundaries', 'circle', circleAndBoundaries);
    addDetector('boundaries', 'rectangle', rectangleAndBoundaries);

    addDetector('circle', 'circle', circleAndCircle);
    addDetector('rectangle', 'rectangle', rectangleAndRectangle);
    addDetector('circle', 'rectangle', circleAndRectangle);

    addDetector('player', 'triggerToNextRoom', playerAndTriggerToNextRoom);
  }

  function addDetector(entityA, entityB, algorithm) {
    detectors[entityA] = detectors[entityA] || {};
    detectors[entityB] = detectors[entityB] || {};

    detectors[entityA][entityB] = algorithm;
    detectors[entityB][entityA] = algorithm;
  }

  function init(callback) {
    setupDetectors();
    callback();
  }

  return { 'applyTo': applyTo, 'init': init };
});
