(function(){

  var ModifyFilterColumns_Edit = function($scope, $modalInstance, XMLHeaderDocService, loc_filteredcolumn, loc_filteredvalue,keepdiscardmatches ){
    $scope.currentsettinglabel = loc_filteredcolumn;
    //console.log(loc_filteredvalue);
    $scope.text = loc_filteredvalue;
    var loc_kdm = keepdiscardmatches;
    var arr_input_trans = (loc_filteredvalue.substr(0, loc_filteredvalue.length -1)).split(';');

    if (loc_kdm == "Keep"){
      $scope.keep_discard = "Current Setting is Keep: Change to Discard";
    }
    if (loc_kdm == "Discard"){
      $scope.keep_discard = "Current Setting is Discard: Change to Keep";
    }


    var arr_input = [];
     for(i=0;i< (arr_input_trans).length;i++){
              var obj = new Object;
              obj.inputvalue = arr_input_trans[i];
              arr_input.push(obj);
     }


 
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

        var arr_pass = [];
        arr_pass.push($scope.text);
        arr_pass.push(loc_kdm);


        $modalInstance.close(arr_pass); 
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel'); 
      };
      $scope.changekeepdiscard = function (){
   
                if (loc_kdm == "Keep"){
                  loc_kdm = "Discard";
                  $scope.keep_discard = "Current Setting is Discard: Change to Keep";
                } else{
                   loc_kdm = "Keep";
                  $scope.keep_discard = "Current Setting is Keep: Change to Discard";
                }

      }
        $scope.gridOptions_filtered_rows = {  
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
                
                var str_in = "";
               for(x=0;x< (arr_input).length;x++){
                    str_in = str_in + arr_input[x]['inputvalue'] + ';';
               }
                  $scope.text =  str_in;
          }; 
     init(); 
   }; 
     ModifyFilterColumns_Edit.$inject = ['$scope', '$modalInstance','XMLHeaderDocService', 'loc_filteredcolumn', 'loc_filteredvalue','keepdiscardmatches' ];
    angular.module('myApp') 
    .controller('ModifyFilterColumns_Edit', ModifyFilterColumns_Edit);

}()); 



