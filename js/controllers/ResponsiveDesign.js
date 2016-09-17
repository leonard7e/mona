app.controller('responsiveDesign', function($scope, $window, $rootScope) {
  // $scope.breakpoint -> 1 (Portalbe)
  // $scope.breakpoint -> 2 (Desktop)
  // $scope.breakpoint -> 3 (Wide Desktop)
  $scope.breakpoint = undefined;

  var win = angular.element($window);

  var update_bpoint = function (bp) {
    if ($scope.breakpoint !== bp) {
      $scope.breakpoint = bp;
    }
  };

  var query_media_breakpoints = function () {
    var wdt = $window['innerWidth'];
    if (wdt <= 700) {
      update_bpoint(1); // portable mode
    } else if (wdt <= 900) {
      update_bpoint(2); // desktop mode
    } else {
      update_bpoint(3); // wide desktop mode
    }
  };

  // Here we keep tracking our breakpoints for responsive design.
  win.bind('resize', function () {
    $scope.$apply( query_media_breakpoints )
  });

  // Broadcasting free window-click. Event will be used in descendant controllers.
  win.bind('click', function (){
    $rootScope.$broadcast('document.click');
  });

  // Set breakpoints on page load just now.
  query_media_breakpoints();
});
