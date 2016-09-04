var googleBooks = angular.module('googleBooks',[
	'booksControllers',
	'infinite-scroll'
]);
googleBooks.factory('results', ['$http', function($http) {
	return {
		requestResults: function(query) {
	        return $http.get(query);
    	}
	}
}]);
