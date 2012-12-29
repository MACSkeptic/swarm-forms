define(function () {
  var detectors = {};

  function canCollide(entityA, entityB) {
    return !(entityA === entityB) && 
      !entityA.disposed && !entityB.disposed &&
      (entityA.collidesWith || {})[entityB.type];
  }

  function collided(entityA, entityB) {
    var params = {};
    params[entityA.type] = entityA;
    params[entityB.type] = entityB;
    return detector(entityA, entityB)(params, entityA, entityB);
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
    return sphereAndRectangle(entities.shot, entities.square);
  }

  function shotAndRock(entities) {
    var square = {};
    square.x = entities.rock.x - entities.rock.width/2;
    square.y = entities.rock.y - entities.rock.height/2;
    square.width = entities.rock.width;
    square.height = entities.rock.height;
    return sphereAndRectangle(entities.shot, square);
  }

  function sphereAndRectangle(sphere, rectange) {
    var cdx = Math.abs(sphere.x - rectange.x - rectange.width/2),
        cdy = Math.abs(sphere.y - rectange.y - rectange.height/2);

    if (cdx > (rectange.width/2 + sphere.radius)) { return false; }
    if (cdy > (rectange.height/2 + sphere.radius)) { return false; }

    if (cdx <= (rectange.width/2)) { return true; } 
    if (cdy <= (rectange.height/2)) { return true; }

    return (
      Math.pow(cdx - rectange.width/2, 2) +
      Math.pow(cdy - rectange.height/2, 2)
    ) <= Math.pow(sphere.radius, 2);
  }

  function shotOutOfBounds(entities) {
    return (entities.shot.x - entities.shot.radius) < entities.boundaries.minX ||
      (entities.shot.x + entities.shot.radius) > entities.boundaries.maxX ||
      (entities.shot.y - entities.shot.radius) < entities.boundaries.minY ||
      (entities.shot.y + entities.shot.radius) > entities.boundaries.maxY;
  }

  function playerAndShot(entities) {
    return false;
  }

  function shotAndShot(ignore, shotA, shotB) {
    return (
      Math.pow(shotA.x - shotB.x, 2) +
      Math.pow(shotA.y - shotB.y, 2)
    ) <= Math.pow(shotA.radius + shotB.radius, 2);
  }

  function playerAndTriggerToNextRoom(entities) {
    return Math.abs(entities.player.x - 320) < 30 && Math.abs(entities.player.y - 200) < 30;
  }

  function setupDetectors() {
    detectors.player = {};
    detectors.shot = {};
    detectors.square = {};
    detectors.boundaries = {};
    detectors.triggerToNextRoom = {};
    detectors.rock = {};

    detectors.player.shot = playerAndShot;
    detectors.shot.player = playerAndShot;

    detectors.square.shot = shotAndSquare;
    detectors.shot.square = shotAndSquare;

    detectors.shot.shot = shotAndShot;

    detectors.shot.boundaries = shotOutOfBounds;
    detectors.boundaries.shot = shotOutOfBounds;

    detectors.triggerToNextRoom.player = playerAndTriggerToNextRoom;
    detectors.player.triggerToNextRoom = playerAndTriggerToNextRoom;

    detectors.shot.rock = shotAndRock;
    detectors.rock.shot = shotAndRock;
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
