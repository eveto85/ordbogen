var googleBooks = angular.module('googleBooks',[
	'booksControllers',
	'infinite-scroll'
]);
googleBooks.factory('results', ['$http', function($http) {
	return {
		getMeSomeBooks: function(query,scope) {
	        return $http.get(query)
			.then(function itWentWell (data){
				if(data.data.totalItems == 0) {
					scope.emptyResponse = true;
				} else {
					scope.emptyResponse = false;
				}
			scope.booksResults = scope.booksResults ? scope.booksResults.concat(data.data.items) : data.data.items;
			},function itDidntGoWell (data) {
				scope.requestError = data.data.error.message;
			});
    	}
	}


 
}]);
