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

    $stateProvider.state('index', {
        url: '/',
        resolve: {
            loadCtrl: function($ocLazyLoad) {
                return $ocLazyLoad.load(['../js/app.js']);
            }
        },
        controller: 'AppCtrl',
        template: '{{abc}}Page A<br/><a ui-sref="center">go center</a>'
    }).state('center', {
        url: '/center',
        resolve: {},
        template: 'Page Center<br/><a ui-sref="index">go index</a>'
    });

});