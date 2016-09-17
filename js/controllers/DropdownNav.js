app.controller('DropdownNav', function ($scope) {
  $scope.activeMenu = -1;

  $scope.doNavSwitch = function($event,menuid) {
    if( $scope.activeMenu === menuid ) {
      $scope.activeMenu = -1;
    } else {
      $scope.activeMenu = menuid;
    }
    $event.stopPropagation();
  };

  $scope.isActive = function(menuid) {
    return $scope.activeMenu === menuid;
  };

  $scope.$on("document.click", function (e, a) {
    $scope.$apply(function () {
      $scope.activeMenu = -1;
    });
  });
});
