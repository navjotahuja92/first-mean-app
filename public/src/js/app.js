var app = angular.module('DiscussionApp', ['ngRoute','ngResource','ngCookies']);


app.config(function($routeProvider, $locationProvider) {

		$routeProvider
			.when('/login', {
				controller : 'UserController',
				templateUrl : 'views/login.html'
			})
			.when('/discussion',{
				controller : 'DiscussionController',
				templateUrl : 'views/discussion.html'
			})
			.otherwise({
				redirectTo : '/discussion'
			});

		$locationProvider.html5Mode(true);
	
});