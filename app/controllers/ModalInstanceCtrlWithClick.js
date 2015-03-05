



(function(){
  var ModalInstanceCtrlWithClick = function($scope,$modal, $modalInstance, items){

      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
      
       
     
      $scope.launchwithrow = function(action){
                switch(action){
                    case 'keepselected':
                       $modalInstance.dismiss('cancel');
                      break;
                    case 'discardselected':
                      $modalInstance.dismiss('cancel');
                      break;
                    case 'unselectrows': 
                        
                         openunselectrows();
                      $modalInstance.dismiss('cancel');
                      break;
                    case 'takeaction':
                      $modalInstance.dismiss('cancel');
                      break;
                    case 'panels':
                      openpanels('lg');
                      break;
                    case 'totalselected':
                      $modalInstance.dismiss('cancel');
                      break;
                    case 'copyclipboard':
                        $modalInstance.dismiss('cancel');
                      break;
                }; // end switch

      };
      
      function openunselectrows(){ 
                    var arr_ret_sort = [];
                    arr_ret_sort[0] = 'unselectrows'; 
                    $modalInstance.close(arr_ret_sort);
      };
      
      
        function openpanels(size){
        var modalInstance = $modal.open({
          templateUrl:'app/views/panelsContent.html',
          controller: 'PanelsInstanceCtrl',
          size: size,
          resolve: {
            
          }
        }).result.then(function(result) {
            var arr_ret_sort = [];
              arr_ret_sort[0] = 'panel'; 
              arr_ret_sort[1] = result;

                $modalInstance.close(arr_ret_sort);
        });
      };
      
      
      
      
    };
      ModalInstanceCtrlWithClick.$inject = ['$scope', '$modal', '$modalInstance', 'items'];
    angular.module('myApp') 
    .controller('ModalInstanceCtrlWithClick', ModalInstanceCtrlWithClick);

}()); 

