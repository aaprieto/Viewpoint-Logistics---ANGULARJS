(function(){
  var FilterInstanceCtrl = function($scope, $modal, $modalInstance,XMLHeaderDocService){
  $scope.arr_xmlhdc = [];
  $scope.arr_xmlhdc = XMLHeaderDocService.all();
  $scope.arr_all_allfilteredcolumns = [];
  $scope.arr_all_allfilteredcolumns = XMLHeaderDocService.allfilteredcolumns(); 
  $scope.arr_xmlhdc_filtered = [];
  $scope.loc_arr_xmlhdc = []; 
      for(i=0;i< ($scope.arr_xmlhdc).length;i++){
        $scope.loc_arr_xmlhdc[i]=$scope.arr_xmlhdc[i];
  }
  
  
      
      
for(x=0;x< ($scope.arr_all_allfilteredcolumns).length;x++){
   
    //console.log( $scope.arr_all_allfilteredcolumns[x]['filteredcolumns'] + " : " + $scope.arr_all_allfilteredcolumns[x]['filteredvalues'] + " : " + $scope.arr_all_allfilteredcolumns[x]['keepdiscardmatches']);
    
    var obj = new Object;
                obj.filteredcolumns = $scope.arr_all_allfilteredcolumns[x]['filteredcolumns'];
                obj.filteredvalues = $scope.arr_all_allfilteredcolumns[x]['filteredvalues'];
                obj.keepdiscardmatches = $scope.arr_all_allfilteredcolumns[x]['keepdiscardmatches'];
                $scope.arr_xmlhdc_filtered.push(obj);
}

      $scope.gridOptions_filter_cols = {};
 

 $scope.gridOptions_filter_cols = {
          data: 'loc_arr_xmlhdc',
          rowHeight: 45,
           columnDefs: [
            {field: 'displayName', displayName: 'Column Labels'},
            {name: 'keep', displayName: '',  cellTemplate: '<button id="editBtn"  class="btn-primary btn-l" ng-click="grid.appScope.keepClick(grid, row, col, rowRenderIndex, colRenderIndex)"  type="button">Keep</button>  <span ng-bind="currentFocused"></span>'},
            {name: 'discard', displayName: '',  cellTemplate: '<button    class="btn-warning  btn-l" ng-click="grid.appScope.discClick(grid, row, col, rowRenderIndex, colRenderIndex)"  type="button">Discard</button>  <span ng-bind="currentFocused"></span>'}
            ],
        };


$scope.sortWay = [{
      ID: 1,
      type: 'Ascending'
    }, {
      ID: 2,
      type: 'Descending'
    }, 
     ]; 

     $scope.okfilter = function (){
            /*
            for(i=0;i< ($scope.arr_xmlhdc_sorted).length;i++){
                console.log($scope.arr_xmlhdc_sorted[i]['sortedcolumns'] + " : " + $scope.arr_xmlhdc_sorted[i]['sortedvalues']);  
            }
            */
          $modalInstance.close($scope.arr_xmlhdc_filtered);  

     };
     $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

  $scope.currentFocused = "";

    $scope.getCurrentFocus = function(){
      var rowCol = $scope.gridApi.cellNav.getFocusedCell();
      
      if(rowCol !== null) {
       
         $scope.currentFocused = 'Row Id:' + rowCol.row.entity.id + ' col:' + rowCol.col.colDef.field;
      }
    };

/*
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

*/

function checkExistingsFilteredColumn(display_name){
   var flag = 1;
                for(var x = 0; x < $scope.arr_xmlhdc_filtered.length; x++) {
                         if ($scope.arr_xmlhdc_filtered[x]['filteredcolumns'] == display_name){
                              flag = 0;
                              break;
                          }
                  }          
   return flag;
}




 $scope.keepClick = function(grid, row, col, rowRenderIndex, colRenderIndex){
    //$scope.msgalertbox(row.entity['displayName'] );
 var retflag;

        retflag =  checkExistingsFilteredColumn(row.entity['displayName']);

         if (retflag == 1){
                    var modalInstance = $modal.open({
                      templateUrl: 'app/views/modifyFilterColumns.html',
                      controller: 'ModifyFilteredColumns',
                      size: 'lg',
                       resolve: { 
                              loc_filteredvalue: function () { 
                                return row.entity['displayName']; 
                              }
                            }
                    }).result.then(function(result) {
                            

                              var obj = new Object;
                              obj.filteredcolumns = row.entity['displayName'];
                              obj.filteredvalues = result;
                              obj.keepdiscardmatches = 'Keep';
                              $scope.arr_xmlhdc_filtered.push(obj);


                    });  
        }else{
                 // $scope.msgalertbox(row.entity['displayName'] + " is already filtered.");
                    alert(row.entity['displayName'] + " is already filtered.");
        }
     

 };

 $scope.discClick = function(grid, row, col, rowRenderIndex, colRenderIndex){
   var retflag;

        retflag =  checkExistingsFilteredColumn(row.entity['displayName']);

         if (retflag == 1){
                    var modalInstance = $modal.open({
                      templateUrl: 'app/views/modifyFilterColumns.html',
                      controller: 'ModifyFilteredColumns',
                      size: 'lg', 
                       resolve: { 
                              loc_filteredvalue: function () { 
                                return row.entity['displayName']; 
                              }
                            }
                    }).result.then(function(result) {
                            console.log("RESULT" + result);

                              var obj = new Object;
                              obj.filteredcolumns = row.entity['displayName'];
                              obj.filteredvalues = result;
                              obj.keepdiscardmatches = 'Discard';
                              $scope.arr_xmlhdc_filtered.push(obj);


                    }); 
        }else{
                //  $scope.msgalertbox(row.entity['displayName'] + " is already filtered.");
                 alert(row.entity['displayName'] + " is already filtered.");
        }
     

}; 

   $scope.foo = function (grid, row, col, rowRenderIndex, colRenderIndex){
       console.log("foo");
   }

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

  
$scope.gridOptions_filter_cols.onRegisterApi = function(gridApi){
       $scope.gridApi = gridApi;
       gridApi.cellNav.on.navigate($scope,function(rowEntity, colDef, newValue, oldValue){
             console.log('Event Triggered');

            });
};
           $scope.removeRow = function(r_idx) {
                    var index = r_idx;
                    $scope.arr_xmlhdc_filtered.splice(index, 1);
                };


var removeTemplate = '<button  class="btn-warning btn-l"  ng-click="grid.appScope.removeRow(rowRenderIndex)" >Remove</button>';

        $scope.gridOptions_filtered_cols = {
          data: 'arr_xmlhdc_filtered',
      rowHeight: 45,
           columnDefs: [
          {name: 'modifycolumns', displayName: 'Modify Column',  cellTemplate: '<button id="editBtn3"  class="btn-primary btn-l" ng-click="grid.appScope.openFilteredCols(grid, row, col, rowRenderIndex, colRenderIndex)"  type="button">Modify</button> '},
          {field: 'filteredcolumns', displayName: 'Filtered Columns'}, 
          {field: 'filteredvalues', displayName: 'Filtered Values'},
          {field: 'keepdiscardmatches', displayName: 'Keep/Discard'},
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




 $scope.openFilteredCols = function(grid, row, col, rowRenderIndex, colRenderIndex){
   

                    var modalInstance = $modal.open({
                      templateUrl: 'modifyFilterColumns_Edit.html',
                      controller: 'ModifyFilterColumns_Edit',
                      size: 'lg',
                       resolve: { 
                              loc_filteredcolumn: function () { 
                                return row.entity['filteredcolumns']; 
                              },
                              loc_filteredvalue: function () { 
                                return row.entity['filteredvalues']; 
                              },
                              keepdiscardmatches: function () { 
                                return row.entity['keepdiscardmatches']; 
                              } 
                            }
                    }).result.then(function(result) {
                           
                              row.entity['filteredvalues'] = result[0];
                              row.entity['keepdiscardmatches'] = result[1];



                            /*
                              var obj = new Object;
                              obj.filteredcolumns = row.entity['displayName'];
                              obj.filteredvalues = result;
                              obj.keepdiscardmatches = 'Discard';
                              $scope.arr_xmlhdc_filtered.push(obj);
                            */

                    }); 
 
     

}; 










/*


              $scope.openSortedCols = function(grid, row, col, rowRenderIndex, colRenderIndex){
                          var modalInstance = $modal.open({
                            templateUrl: 'modifySortedColumns.html',
                            controller: 'ModifySortedColumns',
                             size: 'lg',
                            resolve: { 
                              loc_sortvalues: function () { 
                                return row.entity['sortedvalues']; 
                              }
                            }
                          }).result.then(function(result) {
                                $scope.arr_xmlhdc_sorted[rowRenderIndex]['sortedvalues'] = result;
                          });
              };


              */
    };
      FilterInstanceCtrl.$inject = ['$scope', '$modal', '$modalInstance','XMLHeaderDocService'];
    angular.module('myApp') 
    .controller('FilterInstanceCtrl', FilterInstanceCtrl);

}()); 





