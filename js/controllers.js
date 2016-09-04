var booksControllers = angular.module('booksControllers',[]);

booksControllers.controller('SearchController',['$scope','results', function($scope, results) {
	var apiKey = "AIzaSyCTwJYPf7-DpuD2C0OfQFKExXhqWPs7Wts";

	$scope.hideSingleBook = function (){
		$scope.showSingleBook = false;
	}

	$scope.searchIn = "whatever";
	
	$scope.hideSingleBook();

	$scope.getSomeBooks = function () {
		results.requestResults($scope.query).then(function itWentWell (data){
			if(data.data.totalItems == 0) {
				$scope.emptyResponse = true;
			} else {
				$scope.emptyResponse = false;
			}
		$scope.booksResults = $scope.booksResults ? $scope.booksResults.concat(data.data.items) : data.data.items;
		},function itDidntGoWell (data) {
			$scope.requestError = data.data.error.message;
		});
	}

	$scope.getScrollLikeTheWind = function (){
		if (typeof $scope.booksResults == "undefined" || $scope.startIndex > 500) return;
		$scope.query += "&startIndex="+$scope.startIndex;
	    $scope.getSomeBooks();
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
					$scope.getSomeBooks();
					break;
				case "whatever":
					$scope.query +='&maxResults=10&key='+apiKey;
					$scope.getSomeBooks();
			}
		}
		$scope.startIndex = 10;
	}

	$scope.loadBookInfo = function (index) {
		$scope.specificBook = $scope.booksResults[index];
		$scope.showSingleBook = true;
	}

}]);
