(function(){
  var SpecialsInstanceCtrl = function($scope, $modal, $modalInstance,XMLHeaderDocService){
    function init(){
        console.log("SpecialsInstanceCtrl");
    }
   //
     $scope.cancel = function () { 
        $modalInstance.dismiss('cancel');
      };
      
      
      init();
    };  
      SpecialsInstanceCtrl.$inject = ['$scope', '$modal', '$modalInstance','XMLHeaderDocService'];
    angular.module('myApp') 
    .controller('SpecialsInstanceCtrl', SpecialsInstanceCtrl);

}()); 


