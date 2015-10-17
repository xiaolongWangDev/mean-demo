var CrudController = function($scope, $log, $http){

  /************************************************************************/
  var restPath= "/mission";
  $scope.documentToCreate = {
  };

  $scope.existingDocuments = [];

  findAll();
  /************************************************************************/

  
  /* scope methods */
  $scope.create = function(){
  	var documentJson = angular.toJson($scope.documentToCreate, false);
  	$http.post(restPath, documentJson).
  	success(function(data, status, headers, config){
  		$log.debug("Successful: create - " + documentJson);
  		findAll();
  	}).
  	error(function(data, status, headers, config){
  		$log.debug(JSON.stringify(data));	
  	});
  };

  $scope.update = function(selectedDocument){
    var documentJson = angular.toJson($scope.documentToUpdate, false);
    $http.put(restPath, documentJson).
    success(function(data, status, headers, config){
      $log.debug("Successful: update - from " + JSON.stringify(selectedDocument) + " to " + documentJson);
      angular.copy($scope.documentToUpdate, selectedDocument);
      clearUpdateRow();
    }).
    error(function(data, status, headers, config){
      $log.debug(JSON.stringify(data));
    });
  };

  $scope.delete = function(documentToDelete){
  	$http.delete(restPath + "/" + documentToDelete._id).
  	success(function(data, status, headers, config){
  		$log.debug("Successful: delete - " + JSON.stringify(documentToDelete));
      clearUpdateRow();
  		findAll();
  	}).
  	error(function(data, status, headers, config){
  		$log.debug(JSON.stringify(data));	
  	});
  };

  $scope.toggleUpdateRow = function(selectedDocument, selectedDocumentIndex){
    if($scope.editDocument === selectedDocumentIndex){
      clearUpdateRow();
    } else {
      $scope.editDocument = selectedDocumentIndex;
      $scope.documentToUpdate = {};
      angular.copy(selectedDocument, $scope.documentToUpdate);
    }
  };

  /* private methods */
  function findAll(){
    $http.get(restPath).
    success(function(data, status, headers, config){
      $log.debug("Successful: findAll - " + JSON.stringify({result: data}));
      $scope.existingDocuments = angular.fromJson(data);  
    }).
    error(function(data, status, headers, config){
      log.debug(JSON.stringify(data));
    });
  }

  function clearUpdateRow() {
    $scope.editDocument = null;
    $scope.documentToUpdate = null;
  }

};