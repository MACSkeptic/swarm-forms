define(function (require) {
  
  var basicGun = require('./guns/basic_gun');
  var chaserCreatorGun = require('./guns/chaser_creator_gun');
  var doubleGun = require('./guns/double_gun');
  var spreadGun = require('./guns/spread_gun');
  
  var guns = {};

  guns.basic = basicGun;
  guns.chaserCreator = chaserCreatorGun;
  guns.doubleBarrel = doubleGun;
  guns.spread = spreadGun;
  return guns;
});
