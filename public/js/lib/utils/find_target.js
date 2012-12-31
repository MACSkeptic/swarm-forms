define(function () {
  function randomElementOf(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function isOfType(type) {
    return function (element) { return element && element.type == type; };
  }

  function findTargetOfType(type, lists) {
    var targetList;

    _.find(lists || [], function (list) {
      targetList = _.filter(list || [], isOfType(type));
      return targetList && targetList.length > 0 && targetList;
    });

    return targetList && randomElementOf(targetList);
  }

  return {
    ofType: findTargetOfType
  };
});
