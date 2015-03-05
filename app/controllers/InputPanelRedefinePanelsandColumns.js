(function(){
  var InputPanelRedefinePanelsandColumns = function($scope, $modal, $modalInstance,XMLHeaderDocService){
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
       $scope.submit = function () {
           
           
           console.log("go here");  
           
            $modalInstance.close($scope.val); 
        };
    };
      InputPanelRedefinePanelsandColumns.$inject = ['$scope', '$modal', '$modalInstance','XMLHeaderDocService'];
    angular.module('myApp') 
    .controller('InputPanelRedefinePanelsandColumns', InputPanelRedefinePanelsandColumns);

}()); 


  