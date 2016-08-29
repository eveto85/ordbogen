var googleBooks = angular.module('googleBooks',[
	'ngRoute',
	'booksControllers'
]);

googleBooks.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/',{
		templateUrl: 'views/searchResults.html',
		controller: 'SearchController'
	}).
	when('/book-details/:itemId',{
		templateUrl: 'views/book.html',
		controller: 'SingleBookController'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);