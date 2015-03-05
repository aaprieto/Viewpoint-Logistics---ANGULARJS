
(function(){
  var AlertMessageBox = function($scope, $modalInstance, loc_values ){

            $scope.msg = loc_values 


     $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
 

   }; 
     AlertMessageBox.$inject = ['$scope', '$modalInstance','loc_values'];
      
    
    angular.module('myApp') 
    .controller('AlertMessageBox', AlertMessageBox);

}()); 
