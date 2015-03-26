angular.module('DiscussionApp').factory('Comment',  function($http){
	return {
		
		getComments : function(){
			return $http.get('/comment');
		},

		postComment : function(comment){
			console.log('Posting data' + comment);
			return $http.post('/comment', comment);
		}

	};
})
.factory('User', function($http){
	return {
		getUser : function(){
			return $http.get('/myuser');
		}
	};
});