'use strict';

app.config(function($httpProvider) {
	$httpProvider.interceptors.push('HttpInterceptor');
});