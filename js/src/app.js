'use strict';

var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider
      .when('/', {
        controller: 'mainController',
        templateUrl: 'views/mainView.html'
      });
  }
]);
