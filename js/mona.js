// Mona JavaScript Basic File
var app = angular.module("Mona", ['ngAria']);
app.config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});
