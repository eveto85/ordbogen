var booksControllers = angular.module('booksControllers',[]);

booksControllers.controller('SearchController',['$scope','results', function($scope, results) {
	var apiKey = "AIzaSyCTwJYPf7-DpuD2C0OfQFKExXhqWPs7Wts";
	$scope.hideSingleBook = function (){
		$scope.showSingleBook = false;
	}
	$scope.searchIn = "whatever";
	$scope.hideSingleBook();

	$scope.getScrollLikeTheWind = function (){
		if (typeof $scope.booksResults == "undefined" || $scope.startIndex > 500) return;
	    results.getMeSomeBooks($scope.query+'&startIndex='+$scope.startIndex, $scope);
	    $scope.startIndex +=10;
	}
	$scope.whatToSearchFor = function (){
		if($scope.searchInput.length > 3) {
			$scope.query = 'https://www.googleapis.com/books/v1/volumes?q='+$scope.searchInput;
			$scope.booksResults = $scope.booksResults ? [] : undefined;
			switch ($scope.searchIn) {
				case "inauthor":
				case "intitle":
					$scope.query+= "+"+$scope.searchIn+":"+$scope.searchInput+'&maxResults=10&key='+apiKey;
					results.getMeSomeBooks($scope.query,$scope);
					break;
				case "whatever":
					$scope.query +='&maxResults=10&key='+apiKey;
					results.getMeSomeBooks($scope.query, $scope);
			}
		}
		$scope.startIndex = 10;
	}

	$scope.loadMoreInfo = function (index) {
		$scope.specificBook = $scope.booksResults[index];
		$scope.showSingleBook = true;
	}

}]);
