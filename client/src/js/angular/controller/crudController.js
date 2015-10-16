var CrudController = function($scope, $log, $http){

	var restPath= "/mission";
  $scope.documentToCreate = {
  };

  $scope.existingDocuments = [];

  findAll();

  function findAll(){
  	$http.get(restPath).
  	success(function(data, status, headers, config){
  		console.log("succeeded");
  		$scope.existingDocuments = angular.fromJson(data);	
  	}).
  	error(function(data, status, headers, config){
  		console.log("failed");	
  	});
  }

  $scope.create = function(){
  	var documentJson = angular.toJson($scope.documentToCreate, false);
  	$http.post(restPath, documentJson).
  	success(function(data, status, headers, config){
  		console.log("succeeded");
  		findAll();
  	}).
  	error(function(data, status, headers, config){
  		console.log("failed");	
  	});
  };

  $scope.delete = function(documentToDelete){
  	$http.delete(restPath + "/" + documentToDelete._id).
  	success(function(data, status, headers, config){
  		console.log("succeeded");
  		findAll();
  	}).
  	error(function(data, status, headers, config){
  		console.log("failed");	
  	});
  };

};