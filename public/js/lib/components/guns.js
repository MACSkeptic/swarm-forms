define(['./guns/basicGun', './guns/chaserCreatorGun'], function (basicGun, chaserCreatorGun) {
  var guns = {};
  guns.basic = basicGun;
  guns.chaserCreator = chaserCreatorGun;

  return guns;
});