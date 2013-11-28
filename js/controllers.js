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

});
