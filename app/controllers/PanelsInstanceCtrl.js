(function(){
  var PanelsInstanceCtrl = function($scope, $modal, $modalInstance,XMLHeaderDocService){
        $scope.arr_panelscolumns = XMLHeaderDocService.getcolumngroups();
      
         $scope.panelClick = function(grid, row, col, rowRenderIndex, colRenderIndex){
                $modalInstance.close($scope.arr_panelscolumns[rowRenderIndex]['columnstart']); 
         };
      
         $scope.gridOptions = {  
            data: 'arr_panelscolumns',
            rowHeight: 45,
           columnDefs: [
            {field: 'headertext', displayName: 'Panels'}, 
            {name: 'selectpanel', displayName: '',  cellTemplate: '<button id="selectBtn"  class="btn-primary btn-l" ng-click="grid.appScope.panelClick(grid, row, col, rowRenderIndex, colRenderIndex)"  type="button">Select</button>  <span ng-bind="currentFocused"></span>'}
            ],
        };
      
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
      
        
    };
      PanelsInstanceCtrl.$inject = ['$scope', '$modal', '$modalInstance','XMLHeaderDocService'];
    angular.module('myApp') 
    .controller('PanelsInstanceCtrl', PanelsInstanceCtrl);

}()); 




















