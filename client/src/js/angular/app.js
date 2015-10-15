(function() {
	var app = angular.module('meanDemo', ['ngRoute']);

	// controllers
	app.controller('CrudController', ['$scope', '$log', CrudController]);

	// routes
	app.config(['$routeProvider', function ($routeProvider){
		$routeProvider
		.when('/',
		{
			controller : 'CrudController',
			templateUrl : '/partials/crudFragment.html'
		})
		.otherwise({redirectTo : "/"});
	}]);
})();