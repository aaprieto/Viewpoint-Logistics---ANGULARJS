(function(){
  var XmlInstanceCtrl = function($scope, $modal, $modalInstance,XMLHeaderDocService){
    function init(){
        console.log("XmlInstanceCtrl");
    }
   //
     $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
      
      
      init();
    };  
      XmlInstanceCtrl.$inject = ['$scope', '$modal', '$modalInstance','XMLHeaderDocService'];
    angular.module('myApp') 
    .controller('XmlInstanceCtrl', XmlInstanceCtrl);

}()); 


