(function(){
  var SelectMyViewsCtrl = function($scope, $modal, $modalInstance,XMLHeaderDocService){
    function init(){
        console.log("SelectMyViewsCtrl");
          $scope.arr_all_myviews = [];
         $scope.arr_all_myviews = XMLHeaderDocService.getmyviewslist(); 
        console.log("LENGTH: " +  $scope.arr_all_myviews[0]['viewcode']);
        
    }
   //
      
      
      
     $scope.cancel = function () { 
        $modalInstance.dismiss('cancel');
      };
      
      
       $scope.gridOptions = {  
          data: 'arr_all_myviews',
            rowHeight: 45,
           columnDefs: [
            {field: 'viewcode', displayName: 'MyViews'}, 
            {name: 'select', displayName: '',  cellTemplate: '<button    class="btn-warning btn-l" ng-click="grid.appScope.selectClick(grid, row, col, rowRenderIndex, colRenderIndex)"  type="button">Select</button>  <span ng-bind="currentFocused"></span>'}
            
            ],

        };
       
      
      
      init();
    };  
      SelectMyViewsCtrl.$inject = ['$scope', '$modal', '$modalInstance','XMLHeaderDocService'];
    angular.module('myApp') 
    .controller('SelectMyViewsCtrl', SelectMyViewsCtrl);

}()); 


