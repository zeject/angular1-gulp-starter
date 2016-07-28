'use strict';

app.factory('HttpInterceptor', function($rootScope, $q, $timeout, $injector) {
    var httpInterceptor = {
        'responseError': function(response) {

            return $q.reject(response);
        },
        'response': function(response) {
            console.log(response.config.url);
            return response;
        },
        'request': function(config) {
            console.log(config.headers['Content-Type']);
            return config;
        },
        'requestError': function(config) {
            return $q.reject(config);
        }
    }
    return httpInterceptor;
});