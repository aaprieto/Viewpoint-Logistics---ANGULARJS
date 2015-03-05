(function(){
  var ModifyFilteredColumns = function($scope, $modalInstance, XMLHeaderDocService, loc_filteredvalue){
    $scope.currentsettinglabel = loc_filteredvalue;
    $scope.text = "";
    var arr_input = [];
     var arr_uniqueRows = [];
      function init(){
         var field_name = XMLHeaderDocService.getfieldname($scope.currentsettinglabel);
        $scope.arr_all_allfilterededcolumns = XMLHeaderDocService.arrayzerofilter(field_name); 
          for(i=0;i< ( $scope.arr_all_allfilterededcolumns).length;i++){
                var newobj = new Object;
              newobj.val = $scope.arr_all_allfilterededcolumns[i]
              arr_uniqueRows.push(newobj);
          }
          $scope.arr_all_allfilterededcolumns = arr_uniqueRows;
      };      
      $scope.submit = function () {
        $modalInstance.close($scope.text); 
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel'); 
      };
        $scope.gridOptions_filter_rows = {  
          data: 'arr_all_allfilterededcolumns',
           rowHeight: 45,
          columnDefs: [
            {name: 'val', displayName: $scope.currentsettinglabel},
            {name: 'select', displayName: '',  cellTemplate: '<button id="editBtn"      class="btn-primary btn-l" ng-click="grid.appScope.selectClick(grid, row, col, rowRenderIndex, colRenderIndex)"  type="button">Select</button>  <span ng-bind="currentFocused"></span>'},
            {name: 'deselect', displayName: '',  cellTemplate: '<button  id="editBtn1"  class="btn-warning btn-l" ng-click="grid.appScope.deselectClick(grid, row, col, rowRenderIndex, colRenderIndex)"  type="button">Deselect</button>  <span ng-bind="currentFocused"></span>'}
        
            ],
        };
         $scope.selectClick = function(grid, row, col, rowRenderIndex, colRenderIndex){
             for(i=0;i< (arr_input).length;i++){
                    if (arr_input[i]['inputvalue'] == row.entity['val']){
                          //alert(arr_input[i]['inputvalue'] + " is already selected.");
                          return;
                    }
               }
              var obj = new Object;
              obj.inputvalue = row.entity['val'];
              arr_input.push(obj);
                var str_in = "";
               for(i=0;i< (arr_input).length;i++){
                    str_in = str_in + arr_input[i]['inputvalue'] + ';';
               }

                  //console.log(row.entity['val']);
                  $scope.text =  str_in;
          }; 
          $scope.deselectClick = function(grid, row, col, rowRenderIndex, colRenderIndex){
              
              
              
             for(i=0;i< (arr_input).length;i++){
                    if (arr_input[i]['inputvalue'] == row.entity['val']){
                        
                           arr_input.splice(i, 1);
                    }
               }
                $scope.text = "";
                var str_in = "";
              
               for(x=0;x< (arr_input).length;x++){
                    str_in = str_in + arr_input[x]['inputvalue'] + ';';
                   console.log(str_in);
               }
                  $scope.text =  str_in;
          }; 
     init(); 
   }; 
     ModifyFilteredColumns.$inject = ['$scope', '$modalInstance','XMLHeaderDocService','loc_filteredvalue'];
    angular.module('myApp') 
    .controller('ModifyFilteredColumns', ModifyFilteredColumns);

}()); 

