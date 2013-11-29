var dpscheckeryon = angular.module('dpscheckeryon', {
  setup: function() {
// setup for module name
  },
  teardown: function() {
    //teardown for module name
  }
});

dpscheckeryon.controller('dpscheckeryonCtrl', function ($scope) {
    $scope.Weapons = weaponData;
    $scope.Heads = headData;
    $scope.Bodys = bodyData;
    $scope.Hands = handData;
    $scope.Waists = waistData;
    $scope.Legs = legData;
    $scope.Foots = footData;
    $scope.Necks = neckData;
    $scope.Ears = earData;
    $scope.Wrists = wristData;
    $scope.Rings = ringData;

    $scope.getStrTotal = function (item) {
      var r = 0;
      for (var k in item)
        item[k] && (r += item[k].str);
      return r;
    }

    $scope.getVitTotal = function (item) {
      var r = 0;
      for (var k in item)
        item[k] && (r += item[k].vit);
      return r;
    }

    $scope.getAccTotal = function (item) {
      var r = 0;
      for (var k in item)
        item[k] && (r += item[k].acc);
      return r;
    }

    $scope.getCritTotal = function (item) {
      var r = 0;
      for (var k in item)
        item[k] && (r += item[k].crit);
      return r;
    }

    $scope.getDetTotal = function (item) {
      var r = 0;
      for (var k in item)
        item[k] && (r += item[k].det);
      return r;
    }

    $scope.getSspTotal = function (item) {
      var r = 0;
      for (var k in item)
        item[k] && (r += item[k].ssp);
      return r;
    }

});
