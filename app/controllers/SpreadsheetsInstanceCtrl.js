(function(){
  var SpreadsheetsInstanceCtrl = function($scope, $modal, $modalInstance,XMLHeaderDocService){
   
     $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
        
      
      $scope.opencsv = function () {
                $modalInstance.close('csv');  
      };
      
      $scope.openpdf = function () { 
                $modalInstance.close('pdf');  
        
      };
      
   
    };  
      SpreadsheetsInstanceCtrl.$inject = ['$scope', '$modal', '$modalInstance','XMLHeaderDocService'];
    angular.module('myApp') 
    .controller('SpreadsheetsInstanceCtrl', SpreadsheetsInstanceCtrl);

}()); 


