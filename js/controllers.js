var booksControllers = angular.module('booksControllers',[]);

booksControllers.controller('OverviewController',['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
}]);

booksControllers.controller('SearchController',['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
	$scope.searchIn = "whatever";

	//not enough time to show paginator in the view 

	$scope.getPaginatorInfo = function (data, currentQuery){
		var totalItems = data.data.totalItems-20;
		console.log(totalItems);
		var pagesCount = Math.ceil(totalItems/20);
		$scope.pages = [];
		for (i=1,l=0; i<pagesCount-1, l<totalItems; i++, l=l+20) {
			var pageInfo = {
				number: i,
				pageQuery: currentQuery+'&startIndex='+l
			}			
			$scope.pages.push(pageInfo);
			console.log($scope.pages);
		}
	}

	$scope.getMeSomeBooks = function (url){
		$http.get(url)
		.then(function(data){
			$scope.getPaginatorInfo(data,url);
			$scope.booksResults = data.data.items;
		});
	}
	$scope.whatToSearchFor = function (){
		if($scope.searchInput.length>3) {
			var query = 'https://www.googleapis.com/books/v1/volumes?q='+$scope.searchInput;
			var startIndex = 0;
			switch ($scope.searchIn) {
				case "inauthor":
				case "intitle":
					query+= "+"+$scope.searchIn+":"+$scope.searchInput+'&maxResults=20';
					$scope.getMeSomeBooks(query);
					break;
				case "whatever":
					query +='&maxResults=20';
					$scope.getMeSomeBooks(query);

			}
		}
	}

	$scope.loadBooksForPage = function (url){
		$http.get(url)
		.then(function(data){
			$scope.booksResults = data.data.items;
		});	
	}
}]);

booksControllers.controller('SingleBookController',['$scope','$http','$routeParams', function($scope,$http,$routeParams) {
	$scope.bookId = $routeParams.itemId;
	$http.get('https://www.googleapis.com/books/v1/volumes/'+$scope.bookId)
	.then(function(data){
		$scope.bookInfo = data.data;
	});
}]);