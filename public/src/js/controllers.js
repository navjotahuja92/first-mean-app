angular.module('DiscussionApp').controller('UserController', function($http,$scope,$timeout,$location){
	
	$scope.email = '';
	$scope.password = '';

	$scope.messageResult = '';
	$scope.showMessage = false;
	$scope.authenticate = function(){
		var user = {
			"email" : $scope.email,
			"password": $scope.password
		}

		$http.post('/login', user)
		.success(function(data, status, headers, config) {
			$scope.messageResult = data.message;

			$scope.showMessage = true;
			$timeout(function() {
			  $scope.showMessage = false
			}, 2000);
		  	
		  	if(data.value == "1"){
		  		$location.path('/discussion');
		  	}
		  	
		  });

		
	}

	$scope.createUser = function(){
		var user = {
			"email" : $scope.email,
			"password": $scope.password
		}

		$http.post('/register', user)
		.success(function(data, status, headers, config) {
			$scope.messageResult = data.message;

			$scope.showMessage = true;
			$timeout(function() {
			  $scope.showMessage = false
			}, 10000);

			if(data.value == "1"){
				$scope.email = '';
				$scope.password = '';
			}
		  	
		  });
	}

	
})
.controller('DiscussionController', function($scope,$http,Comment,$cookies,$timeout,User){
		
		$scope.comments = {};
		$scope.comment = '';

		$scope.showMessage = false;
		$scope.messageResult = '';

		$scope.currentUser = '';
		User.getUser().success(function(data,status,headers,config){
			$scope.currentUser = data.email;
		});

		Comment.getComments().success(function(data, status, headers, config) {
			$scope.comments = data;
		});

	
		
		$scope.postComment = function(){

			if ($scope.comment == ""){
				$scope.messageResult = 'Enter some message...';
				$scope.showMessage = true;
				$timeout(function() {
					  $scope.showMessage = false;
					}, 1000);
				return;
			}
			var comment = {
				"comment" : $scope.comment
			}
			Comment.postComment(comment).success(function(data, status, headers, config) {
				console.log(data);
				if(data.success = "1") {
					$scope.comments.push(data.data);
					$scope.comment = '';

				}else{
					$scope.messageResult = 'Failed to send message';
					$scope.showMessage = true;
					$timeout(function() {
					  $scope.showMessage = false;
					}, 3000);
				}
				
			
					
			});
		}	
});