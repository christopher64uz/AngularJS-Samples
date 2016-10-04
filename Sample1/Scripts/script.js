// Code goes here
(function () {
    var app = angular.module("myApp",['ui.router']);
    app.controller("CController", function($scope) {
        $scope.Users = [
        {
            name: 'James',
            id: 32,
            order: 23.344
        }, 
        {
            name: 'King',
            id: 12,
            order: 2344
        }, 
        {
            name: 'Bill',
            id: 123,
            order: 1.233
        }, 
        {
            name: 'Angular',
            id: 2323,
            order: 23.3455
        }]
        $scope.doSort = function(SortName) {
            $scope.state = SortName;
            $scope.reverse = !$scope.reverse;
        }
    });

    app.config(function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home',{
            url:'/home',
            templateUrl:'Pages/home.html'
        })
            .state('user',{
            url:'/User',
            templateUrl:'Pages/customers.html'
        })
            .state('simpleSearch',{
            url:'/Search',
            templateUrl:'Pages/search.html'
        })
        
    });
}())
