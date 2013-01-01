define(function (require) {
  var thingsToLoad = [];

  function loadEverything(callback) {
    addTexture(this, 'rock', 'rock.jpg');
    addTexture(this, 'woodenFloor', 'wooden_floor.png');

    waitForEverythingToLoadThen(callback);
  }

  function addTexture(textures, name, file) {
    if (textures[name]) { return; }

    thingsToLoad.push(name);
    textures[name] = new Image();
    textures[name].onload = function () { delete thingsToLoad[thingsToLoad.indexOf(name)]; };
    textures[name].src = '/media/images/textures/' + file;
  }

  function everythingIsLoaded() { return !_.compact(thingsToLoad).length; }

  function waitForEverythingToLoadThen(callback) {
    if (everythingIsLoaded()) { return callback(); }

    window.setTimeout(function () { waitForEverythingToLoadThen(callback); }, 100);
  }


  return { load: loadEverything };
});
