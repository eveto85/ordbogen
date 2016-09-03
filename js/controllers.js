var booksControllers = angular.module('booksControllers',[]);

booksControllers.controller('SearchController',['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
	$scope.searchIn = "whatever";

	$scope.getMeSomeExtraBooks = function (){
		 if (typeof $scope.booksResults == "undefined") return;
	    $scope.getMeSomeBooks($scope.query+'&startIndex='+$scope.startIndex);
	    $scope.startIndex +=10;
	    console.log("1");
	}

	$scope.getMeSomeBooks = function (url){
		$http.get(url)
		.then(function(data){
			$scope.booksResults = $scope.booksResults.length ? $scope.booksResults.concat(data.data.items) : data.data.items;
		});
	}
	$scope.whatToSearchFor = function (){
		if($scope.searchInput.length > 3) {
			$scope.query = 'https://www.googleapis.com/books/v1/volumes?q='+$scope.searchInput;
			$scope.booksResults = [];
			switch ($scope.searchIn) {
				case "inauthor":
				case "intitle":
					$scope.query+= "+"+$scope.searchIn+":"+$scope.searchInput+'&maxResults=10';
					$scope.getMeSomeBooks($scope.query);
					break;
				case "whatever":
					$scope.query +='&maxResults=10';
					$scope.getMeSomeBooks($scope.query);

			}
		}
		$scope.startIndex = 10;
	}
}]);

booksControllers.controller('SingleBookController',['$scope','$http','$routeParams', function($scope,$http,'$routeParams') {
	$scope.bookId = $routeParams.itemId;
	$http.get('https://www.googleapis.com/books/v1/volumes/'+$scope.bookId)
	.then(function(data){
		$scope.bookInfo = data.data;
	});
}]);