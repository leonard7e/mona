app.controller('MainDropdownNav', function ($scope, $document) {
  $scope.$on('menuItemEvent', function (event, msg) {
    if (msg.type === "enterMenu") {
      $scope.$broadcast('popupCtlEvent', {
        type: 'show',
        navId: msg.navId } );
    } 
  });
});

app.controller('Dropdown', function ($scope, $document) {
  $scope.itsId = null;
  $scope.doPopup = false;
  $scope.init = function (target) {
    $scope.itsId = target;
    $document.bind("click", function (event) {
      $scope.$apply(function(){
        $scope.doPopup = false;
      });
    });
  };

  $scope.$on('popupCtlEvent', function (event, msg) {
    if (msg.navId === $scope.itsId || msg.navId == "_ALL_") {
      if (msg.type === 'show') {
        $scope.doPopup = true;
      } else if (msg.type === 'hide') {
        $scope.doPopup = false;
      }
    }
    else if (msg.type == "show") {
      // Hide, because other popups are shown
      $scope.doPopup = false;
    }
    $scope.$digest();
  });
});
