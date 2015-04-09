'use strict';

app.controller('mainController', ['$scope', 'DataService', function($scope, DataService) {

  $scope.data = DataService.getData();
}]);
