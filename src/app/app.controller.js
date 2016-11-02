(function () {
    'use strict';

    angular
        .module('ngStart')
        .controller('DashboradCtrl', DashboradCtrl)

    /** @ngInject */
    function DashboradCtrl() {
        var vm = this;
        vm.title = 'welcome page';
        init();

        function init() {}

    }

}());