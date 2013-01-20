define(['./guns/basic_gun', './guns/chaser_creator_gun'], function (basicGun, chaserCreatorGun) {
  var guns = {};
  guns.basic = basicGun;
  guns.chaserCreator = chaserCreatorGun;

  return guns;
});
