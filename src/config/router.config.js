'use strict';

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('url', {
        // url: '/goto/:param', // '/goto/{param}' or '/goto?param&param1'
        resolve: {},
        abstract: true,
        templateUrl: '',
        data: {} //$state.current.data.xxx
    });

});