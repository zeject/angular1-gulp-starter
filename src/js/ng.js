var app = angular.module('app', []);

app.controller('ctrl', function($scope) {
    var vm = $scope.vm = {};

    vm.str = 'test';
});