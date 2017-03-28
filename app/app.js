(function(angular) {
	'use strict';

	angular.module('stk', [
		'ui.router',
		'stk.dashboard'
	]).config(config);

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider
			.state('stk', {
	            url: '/dashboard',
	            templateUrl: 'dashboard/dashboard.html',
	            controller: 'DashboardController',
	            controllerAs: 'vm'
	        });
	}
})(angular);
