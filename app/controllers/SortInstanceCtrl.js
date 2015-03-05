

(function(){
  var SortInstanceCtrl = function($scope, $modal, $modalInstance,XMLHeaderDocService){
  $scope.arr_xmlhdc = [];
  $scope.arr_xmlhdc = XMLHeaderDocService.all();
  $scope.arr_all_allsortedcolumns = [];
  $scope.arr_all_allsortedcolumns = XMLHeaderDocService.allsortedcolumns(); 
  $scope.arr_xmlhdc_sorted = [];
   
    $scope.loc_arr_xmlhdc = []; 
  for(i=0;i< ($scope.arr_xmlhdc).length;i++){
      $scope.loc_arr_xmlhdc[i]=$scope.arr_xmlhdc[i];
  }



for(x=0;x< ($scope.arr_all_allsortedcolumns).length;x++){
     var obj = {}; 
                obj["sortedcolumns"] = $scope.arr_all_allsortedcolumns[x]['sortedcolumns'];
                obj["sortedvalues"] = $scope.arr_all_allsortedcolumns[x]['sortedvalues'];
                 $scope.arr_xmlhdc_sorted.push(obj);  
}
$scope.gridOptions_sort_cols = {};
$scope.sortWay = [{
      ID: 1,
      type: 'Ascending'
    }, {
      ID: 2,
      type: 'Descending'
    }, 
     ]; 

     $scope.oksort = function (){
            /*
            for(i=0;i< ($scope.arr_xmlhdc_sorted).length;i++){
                console.log($scope.arr_xmlhdc_sorted[i]['sortedcolumns'] + " : " + $scope.arr_xmlhdc_sorted[i]['sortedvalues']);  
            }
            */
          $modalInstance.close($scope.arr_xmlhdc_sorted); 

     };
     $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

  $scope.currentFocused = "";

    $scope.getCurrentFocus = function(){
      var rowCol = $scope.gridApi.cellNav.getFocusedCell();
      console.log("rowCol: " + rowCol);
      if(rowCol !== null) {
        console.log('Row Id:' + rowCol.row.entity.id + ' col:' + rowCol.col.colDef.field);
          $scope.currentFocused = 'Row Id:' + rowCol.row.entity.id + ' col:' + rowCol.col.colDef.field;
      }
    };

function checkExistingsSortedColumn(display_name){
   var flag = 1;
                for(var x = 0; x < $scope.arr_xmlhdc_sorted.length; x++) {
                         if ($scope.arr_xmlhdc_sorted[x]['sortedcolumns'] == display_name){
                              flag = 0;
                              break;
                          }
                  }          
   return flag;
}


 $scope.ascClick = function(grid, row, col, rowRenderIndex, colRenderIndex){
                  
  var retflag;
            retflag = checkExistingsSortedColumn(row.entity['displayName']);


            if (retflag == 1){
                var obj = {};

                obj["sortedcolumns"] = row.entity['displayName'];
                obj["sortedvalues"] ="Ascending";

                 $scope.arr_xmlhdc_sorted.push(obj);  

               }else{
                  $scope.msgalertbox(row.entity['displayName']  + " is already sorted.");
               }


   
 };
    $scope.msgalertbox = function(loc_dispname){
                     //console.log(row.entity['sortedvalues']);

                          var modalInstance = $modal.open({
                            templateUrl: 'alertmessagebox.html',
                            controller: 'AlertMessageBox',
                           
                            resolve: { 
                              loc_values: function () { 
                                return loc_dispname; 
                              }
                            }
                          }).result.then(function(result) {
                                //console.log("Since youve been gone: " + result);
                                 // $scope.message = "You said " + result;
                          });
    }; 
 $scope.descClick = function(grid, row, col, rowRenderIndex, colRenderIndex){
  var retflag;
            retflag = checkExistingsSortedColumn(row.entity['displayName']);


            if (retflag == 1){
  
                      var obj = {};
                obj["sortedcolumns"] = row.entity['displayName'];
                obj["sortedvalues"] ="Descending";
                  //var arr_ay = [{"sortedcolumns":"test"}];
                 $scope.arr_xmlhdc_sorted.push(obj);  

             }else{
                  $scope.msgalertbox(row.entity['displayName'] + " is already sorted.");
             }


}; 



   $scope.msgalertbox = function(loc_dispname){
                     //console.log(row.entity['sortedvalues']);

                          var modalInstance = $modal.open({
                            templateUrl: 'alertmessagebox.html',
                            controller: 'AlertMessageBox',
                           
                            resolve: { 
                              loc_values: function () { 
                                return loc_dispname; 
                              }
                            }
                          }).result.then(function(result) {
                                //console.log("Since youve been gone: " + result);
                                 // $scope.message = "You said " + result;
                          });
    };


      $scope.gridOptions_sort_cols = {  
          data: 'loc_arr_xmlhdc',
            rowHeight: 45,
           columnDefs: [
            {field: 'displayName', displayName: 'Column Labels'}, 
            {name: 'asc', displayName: '',  cellTemplate: '<button id="editBtn"  class="btn-primary btn-l" ng-click="grid.appScope.ascClick(grid, row, col, rowRenderIndex, colRenderIndex)"  type="button">Ascending</button>  <span ng-bind="currentFocused"></span>'},
            {name: 'desc', displayName: '',  cellTemplate: '<button    class="btn-warning btn-l" ng-click="grid.appScope.descClick(grid, row, col, rowRenderIndex, colRenderIndex)"  type="button">Descending</button>  <span ng-bind="currentFocused"></span>'}
            
            ],

        };
         
$scope.gridOptions_sort_cols.onRegisterApi = function(gridApi){
       $scope.gridApi = gridApi;
       gridApi.cellNav.on.navigate($scope,function(newRowCol, oldRowCol){
              console.log('navigation event Second time');
            });
};
           $scope.removeRow = function(r_idx) {
                    var index = r_idx;
                    $scope.arr_xmlhdc_sorted.splice(index, 1);
                };


var removeTemplate = '<button  class="btn-warning btn-l"  ng-click="grid.appScope.removeRow(rowRenderIndex)" >Remove</button>';

        $scope.gridOptions_sorted_cols = {  
          data: 'arr_xmlhdc_sorted',
          enableCellEditOnFocus: true,
          enableSorting: false,
          enableFiltering: false,
           rowHeight: 45,
           columnDefs: [ 
          {name: 'modifycolumns', displayName: 'Modify Columns',  cellTemplate: '<button id="editBtn3"  class="btn-primary btn-l" ng-click="grid.appScope.openSortedCols(grid, row, col, rowRenderIndex, colRenderIndex)"  type="button">Modify</button> '},
          {field: 'sortedcolumns', displayName: 'Sorted Columns'}, 
          {field: 'sortedvalues', displayName: 'Sorted Values',    editType: 'dropdown'},
          {field: 'remove', displayName:'', cellTemplate: removeTemplate}
          ]  
        }; 


          $scope.myViewModel = {
              scrollToFocus :     function( rowIndex, colIndex ) {
                      rowIndex = 0;
                      colIndex = 0;
                    $scope.gridApi.cellNav.scrollTo( $scope, $scope.gridOptions_sort_cols.data[rowIndex], $scope.gridOptions_sort_cols.columnDefs[colIndex]); 
          },

            clickAscending : function(grid, row, col, rowRenderIndex, colRenderIndex){
                console.log("Ascending: " +  $scope.gridOptions_sort_cols.cellNav.getCurrentSelection());
                  alert("Ascending: " );
          },
            clickDescending : function(){
                console.log("Descending");
                  alert("Descending");

            }
            
         };

              $scope.openSortedCols = function(grid, row, col, rowRenderIndex, colRenderIndex){
                          var modalInstance = $modal.open({
                            templateUrl: 'app/views/modifySortedColumns.html',
                            controller: 'ModifySortedColumns',
                            resolve: { 
                              loc_sortvalues: function () { 
                                return row.entity['sortedvalues']; 
                              }
                            }
                          }).result.then(function(result) {
                                $scope.arr_xmlhdc_sorted[rowRenderIndex]['sortedvalues'] = result;
                          });
              };
    };
      SortInstanceCtrl.$inject = ['$scope', '$modal', '$modalInstance','XMLHeaderDocService'];
    angular.module('myApp') 
    .controller('SortInstanceCtrl', SortInstanceCtrl);

}()); 




















