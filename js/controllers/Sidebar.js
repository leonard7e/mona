app.controller('sidebarCtrl', function ($scope) {
  $scope.filterActive = [];
  $scope.filterInit = function (idx) {
    $scope.filterActive.push(idx);
    // insert idx into filterActive only once
  };
  $scope.filterSwitch = function (idx) {
    var pos = $scope.filterActive.indexOf(idx);
    if (pos >= 0) {
      $scope.filterActive.splice(pos, 1);
    } else {
      $scope.filterActive.push(idx);
    }
  };
  $scope.filterPoppedUp = function (idx) {
    return ($scope.filterActive.indexOf(idx) === -1);
  };
});
