app.controller('taxonomy', function($scope){
  // Helper functions
  function insert_tax (name, value) {
    if ( !($scope.taxonomy[name].indexOf(value) >= 0) ){
      $scope.taxonomy[name].push(value);
      $scope.taxonomy[name].sort(); // TODO: faster insert, basing on splice
    }
  };

  function remove_tax (name, value) {
    idx = $scope.taxonomy[name].indexOf(value);
    if (idx >= 0) {
      $scope.taxonomy[name].splice(idx, 1);
    } else {
      console.log ("Error:", name,"->",value, "not inside taxonomy")
    }
  };

  function empty_tax () {
    for (t in $scope.taxonomy) {
      if($scope.taxonomy[t].length > 0) {
        return false;
      }
    };
    return true;
  };

  function switch_tax (name, value) {
    if ($scope.taxonomy[name].indexOf(value) >= 0) {
      remove_tax(name, value);
    } else {
      insert_tax(name, value);
    };
  };

  function in_tax (name, value) {
    for(var idx=0; idx<$scope.taxonomy[name].length; ++idx) {
      if ( $scope.taxonomy[e] > value)
      {
        return false;
      } else if ($scope.taxonomy[e] === value) {
        return true;
      };
    };
  };

  //
  $scope.taxonomy = undefined;
  $scope.init_taxonomy = function (taxonomy) {
    $scope.taxonomy = taxonomy;
    console.log("init taxonomy to", $scope.taxonomy);
  };
  //

  $scope.taxSwitch = function (name,value) {
    switch_tax(name,value);
  }

  $scope.taxIsActive = function (tax) {
    for (var t in tax) {
      for (var i =0; i< tax[t].length; ++i){
        if($scope.taxonomy[t].indexOf(tax[t][i])>= 0) {
          return true;
        }
      }
    }
    return false;
  };
  $scope.taxIsEmpty = function () {
    return empty_tax();
  };
});
