'use strict';

app.run(function($rootScope, $state) {

    /**全局跳转拦截 */
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options) {
            // event.preventDefault(); // 取消默认跳转
            // transitionTo() promise will be rejected with 
            // a 'transition prevented' error
        });

    /**找不到跳转页面 */
    $rootScope.$on('$stateNotFound',
        function(event, unfoundState, fromState, fromParams) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });

    /**路由跳转成功 */
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {

        });

    /**路由跳转错误 */
    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error) {

        });

    /**页面开始加载 */
    $rootScope.$on('$viewContentLoading',
        function(event, viewConfig) {
            // Access to all the view config properties.
            // and one special property 'targetView'
            // viewConfig.targetView 
        });

    /**页面加载完成 */
    $rootScope.$on('$viewContentLoaded',
        function(event) {});
});