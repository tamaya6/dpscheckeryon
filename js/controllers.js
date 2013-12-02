var dpscheckeryon = angular.module('dpscheckeryon', {
  setup: function() {
// setup for module name
  },
  teardown: function() {
    //teardown for module name
  }
});

dpscheckeryon.controller('dpscheckeryonCtrl', function ($scope) {
    $scope.item = [];
    $scope.baseParameter = [];
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

    $scope.wsdmg = 180;
    $scope.jinrai = 0;

    $scope.item.weapon = $scope.Weapons[0];
    $scope.item.head = $scope.Heads[0];
    $scope.item.body = $scope.Bodys[0];
    $scope.item.hand = $scope.Hands[0];
    $scope.item.waist = $scope.Waists[0];
    $scope.item.leg = $scope.Legs[0];
    $scope.item.foot = $scope.Foots[0];
    $scope.item.neck = $scope.Necks[0];
    $scope.item.ear = $scope.Ears[0];
    $scope.item.wrist = $scope.Wrists[0];
    $scope.item.ring1 = $scope.Rings[0];
    $scope.item.ring2 = $scope.Rings[0];

    $scope.baseParameter.str = 265;
    $scope.baseParameter.vit = 202;
    $scope.baseParameter.acc = 341;
    $scope.baseParameter.crit = 341;
    $scope.baseParameter.det = 202;
    $scope.baseParameter.ssp = 341;


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

      // AA間隔（※武器固有ではなく迅雷込値）
      r['aaDelay'] = i.weapon.aadel*(1-($scope.jinrai*0.05));

      // AA威力
      r['aaDmg'] = (i.weapon.aadam / i.weapon.pyhd) * 100;

      // クリティカル確率
      r['critAve'] = at.crit * 0.0693 - 18.486;

      // クリ倍率
      r['critMag'] = 1 + 0.5 * r['critAve'] / 100;

      // AA平均ダメ
      r['aaAveDmg'] = (r['aaDmg']/100)*((at.str*0.0032+0.4162)*i.weapon.pyhd+(at.str*0.1001-0.3529)+(at.det-202)*0.11)*r['critMag'];

      // WS平均ダメ
      r['wsAveDmg'] = ($scope.wsdmg/100)*((at.str*0.0032+0.4162)*i.weapon.pyhd+(at.str*0.1001-0.3529)+(at.det-202)*0.035)*r['critMag'];

      // GCD
      r['gcd'] = (2.5-(it.ssp/1000))*(1-($scope.jinrai*0.05));

      // AA DPS
      r['aaDps'] = r['aaAveDmg']/r['aaDelay']*(1+$scope.jinrai*0.07);

      // WS DPS
      r['wsDps'] = r['wsAveDmg']/r['gcd']*(1+$scope.jinrai*0.07);

      // 総DPS
      r['allDps'] = r['aaDps']+r['wsDps'];

      // 基礎DPS
      r['basicDps'] = ((r['aaDmg']/100)*((b.str*0.0032+0.4162)*i.weapon.pyhd+(b.str*0.1001-0.3529)+(b.det-202)*0.11)*(1+0.5*(b.crit*0.0693-18.486)/100)/r['aaDelay'])+(($scope.wsdmg/100)*((b.str*0.0032+0.4162)*i.weapon.pyhd+(b.str*0.1001-0.3529)+(b.det-202)*0.035)*(1+0.5*(b.crit*0.0693-18.486)/100)/(2.5-$scope.jinrai*0.05))

      //r['base'] = b;
      //r['item'] = i;
      //r['itemTotal'] = it;
      return r;
    }

});
