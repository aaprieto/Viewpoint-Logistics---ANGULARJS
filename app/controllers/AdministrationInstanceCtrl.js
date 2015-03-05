(function(){
  var AdministrationInstanceCtrl = function($scope, $modal, $modalInstance,XMLHeaderDocService){
    function init(){
        console.log("AdministrationInstanceCtrl");
    }
     
     $scope.createanewmyview = function () {
        console.log("Creating a new MyView.....");
             var modalInstance = $modal.open({
                  templateUrl: 'app/views/createNewMyView.html',
                  controller: 'CreateNewMyView',   
                  size: 'lg',
                  resolve: {     
                    items: function () {
                      return $scope.items;
                    } 
                  }
                }).result.then(function(result) {
                                //console.log("Since youve been gone: " + result);
                                 // $scope.message = "You said " + result;
                        $modalInstance.close(result); 
                          
                 });
     }
     
     $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
     };
      
      
      init();
    };  
      AdministrationInstanceCtrl.$inject = ['$scope', '$modal', '$modalInstance','XMLHeaderDocService'];
    angular.module('myApp') 
    .controller('AdministrationInstanceCtrl', AdministrationInstanceCtrl);

}()); 


