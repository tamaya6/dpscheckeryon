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

    // アイテム加算分のparameterのトータル
    $scope.getItemTotal = function (item) {
      var r = {str: 0, vit:0, acc:0, crit:0, det:0, ssp:0};
      for (var k in item) {
        item[k] && (r.str += item[k].str);
        item[k] && (r.vit += item[k].vit);
        item[k] && (r.acc += item[k].acc);
        item[k] && (r.crit += item[k].crit);
        item[k] && (r.det += item[k].det);
        item[k] && (r.ssp += item[k].ssp);
      }
      return r;
    }


    $scope.getAllTotal = function (baseParameter, itemTotal) {
      var b = baseParameter, t = itemTotal,
          r = {str: 0, vit:0, acc:0, crit:0, det:0, ssp:0};
      for (var i in b) {
        r[i] += b[i];
        r[i] += t[i];
      }
      return r;
    };

    $scope.getCalcAll = function (baseParameter, item) {
      var b = baseParameter,
          i = item,
          it = this.getItemTotal(i),
          r = {},
          at = this.getAllTotal(b,it);

      // AA威力
      r['aaDmg'] = (i.weapon.aadam / i.weapon.pyhd) * 100;
      // クリティカル確率
      r['critAve'] = at.crit * 0.0693 - 18.486;

      // クリ倍率
      r['critMag'] = 1 + 0.5 * r['critAve'] / 100;

      // AA平均ダメ
      r['aaAveDmg'] = (r['aaDmg']/100)*((at.str*0.0032+0.4162)*i.weapon.pyhd+(at.str*0.1001-0.3529)+(at.det-202)*0.11)*r['critMag'];

      //r['base'] = b;
      //r['item'] = i;
      //r['itemTotal'] = it;
      return r;
    }

});
