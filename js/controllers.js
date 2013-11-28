var dpscheckeryon = angular.module('dpscheckeryon', {
  setup: function() {
    // setup for module name
  },
  teardown: function() {
    //teardown for module name
  }
});

dpscheckeryon.controller('dpscheckeryonCtrl', function ($scope) {
    $scope.Weapons = data;

    $scope.weaponSelctData = null;
    $scope.weaponChange = function () {
        $scope.weaponSelctData = [];
        $scope.weaponSelctData.push($scope.weapon.name);
    };
});
