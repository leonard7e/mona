// ---
function node_index(name) {
  return function (element, index, array) {
    if (element.name == name) {
      return true;
    } else {
      return false;
    }
  }
}

function node_new(type_1, name, type_2, values) {
  n = {
    'type': type_1,
    'name': name,
  };
  ts = tax_other_types(type_1);
  ix_ts = ts.indexOf(type_2);
  for (i in tax_other_types(type_1)) {
    if (i == ix_ts) {
      n[type_2] = values;
    } else {
      n[ts[i]] = [];
    }
  }

  return n;
}

// ---
function optional(data, default_value) {
  if (data == undefined) {
    return default_value;
  }
  return data;
}


function tax_other_types(type) {
  if (type == "town") {remains = ["category", "tag"]};
  if (type == "category") {remains = ["town", "tag"]};
  if (type == "tag") {remains = ["town","category"]};
  return remains;
}



app.controller('taxonomy', function($scope){
  // The selection of taxonomy items
  $scope.taxSelect = {
    "town": [],
    "category": [],
    "tag": [],
  };

  // Complete taxonomy hierarchy
  $scope.taxonomy = {
    "town": [],
    "category": [],
    "tag": [],
  };

  $scope.taxInit = function (tax) {
    function add_if_needed(type_1, values_1, type_2, values_2) {
      for (i in values_1) {
        ix = $scope.taxonomy[type_1].findIndex(node_index(values_1[i]));
        if ( ix >= 0) {
          if ( $scope.taxonomy[type_1][ix][type_2] != undefined ){
            $scope.taxonomy[type_1][ix][type_2]= $scope.taxonomy[type_1][ix][type_2].concat(
              values_2.filter( function (x) {
                  return $scope.taxonomy[type_1][ix][type_2].indexOf(x) < 0;
                })
              );
          } else {
            $scope.taxonomy[type_1][ix][type_2] = values_2;
          }
        } else {
          $scope.taxonomy[type_1].push(node_new(type_1, values_1[i], type_2, values_2));
        }
      }
    };

    function process_tstack(tstack) {
      tstack.forEach(function(t1) {
        tstack.forEach(function(t2) {
          if (t1 != t2) {
            if(t1.data.length > 0) {
              add_if_needed(t1.type, t1.data, t2.type, t2.data);
            }
          }
        })
      })
    }

    function process_tax() {
      var tstack = [];

      tstack.push({'type': 'town', 'data': optional(tax.town, [])});
      tstack.push({'type': 'category', 'data': optional(tax.category, [])});
      tstack.push({'type': 'tag', 'data': optional(tax.tag, [])});

      // ---
      process_tstack(tstack);
    };
    process_tax();
  };


  // ---
  function tax_match ( tax, name, def ) {
    function tax_match_selection (tax, name) {
      if (tax[name] == undefined) {
        return false;
      }
      else {
        for (var i =0; i< tax[name].length; ++i) {
          if($scope.taxSelect[name].indexOf(tax[name][i])>= 0) {
            return true;
          }
        }
      }
      return false;
    };

    if($scope.taxSelect[name].length > 0) {
      return tax_match_selection(tax, name);
    }
    return def;
  }


  // ---
  $scope.taxHideBlogItem = function (tax) {
    return !(tax_match(tax, "town", true) && tax_match(tax, "category", true) && tax_match(tax, "tag", true));
  };

  $scope.taxSwitchActive = function (name, tax) {
    return tax_match(tax, name, false);
  };




  // ---
  function hide_switch (type, value) {
    var to_hide = tax_other_types(type);

    for (x = 0; x<to_hide.length; ++x) {
      var need_hide = to_hide[x];
      if ($scope.taxSelect[need_hide].length > 0) {
        for ( i in $scope.taxSelect[need_hide]) {
          ix = $scope.taxonomy[type].findIndex(node_index(value));
          node = $scope.taxonomy[type][ix];
          if (node[need_hide].indexOf($scope.taxSelect[need_hide][i]) >= 0) {
            return true;
          }
        };
      }
    };
    return false;
  };

  $scope.taxHideTownSwitch = function (tw) {
    return hide_switch("town", tw);
  };

  $scope.taxHideCategorySwitch = function (c) {
    return hide_switch("category", c);
  };

  $scope.taxHideTagSwitch = function (t) {
     return hide_switch("tag", t);
  };

  // ---
  $scope.taxDoSwitch = function (name,value) {
    function switch_tax (name, value) {
      function select_tax (name, value) {
        if ( !($scope.taxSelect[name].indexOf(value) >= 0) ){
          $scope.taxSelect[name].push(value);
          $scope.taxSelect[name].sort(); // TODO: faster insert, basing on splice
        }
      };

      function deselect_tax (name, value) {
        idx = $scope.taxSelect[name].indexOf(value);
        if (idx >= 0) {
          $scope.taxSelect[name].splice(idx, 1);
        } else {
          console.log ("Error:", name,"->",value, "not inside taxonomy")
        }
      };

      if ($scope.taxSelect[name].indexOf(value) >= 0) {
        deselect_tax(name, value);
      } else {
        select_tax(name, value);
      };
    };

    switch_tax(name,value);
  };

  $scope.filterUsed = function (name) {
    return $scope.taxSelect[name].length > 0;
  };

  $scope.filterReset = function (name) {
    $scope.taxSelect[name] = [];
  };
});
