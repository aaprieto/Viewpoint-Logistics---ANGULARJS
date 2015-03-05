(function(){
  var RedefinePanelsAndColumnsCtrl = function($scope, $modal, $modalInstance,XMLHeaderDocService,RenditionFactory,loc_values){
      var x2js = new X2JS();
       function init(){
           $scope.dat_arr_userrenditions = [];
           //console.log("checkpoint 1: " + $scope.dat_arr_userrenditions.length);
           
         //  $scope.dat_arr_userrenditions = loc_values;
           
            for(var i=0; i< loc_values.length; i++){
                                             var obj = new Object;
                                             
                                                    obj.id = loc_values[i]['id'];
                                                    obj.type = loc_values[i]['type'];
                                                    obj.columnname = loc_values[i]['columnname'];
                                                    obj.headertext = loc_values[i]['headertext'];
                                                    obj.bgcolor = loc_values[i]['bgcolor'];
                                                    $scope.dat_arr_userrenditions.push(obj);
                                               
                                                
           };
           
           
           
           
           //$scope.dat_arr_userrenditions = XMLHeaderDocService.getuserrenditionlist();
           //console.log("checkpoint 2: " + $scope.dat_arr_userrenditions.length);
               
           
             
           
             RenditionFactory.getrenditionFactory(XMLHeaderDocService.getsessionid())   
                                          .success(
                                        function (xml) {
                                            var jsonObj = x2js.xml_str2json(xml);
                                            var arr_renditions = jsonObj['ezware_response']['refresh_data']['RENDITION']['data'];
                                             //XMLHeaderDocService.setmyviewslist(arr_myviews);
                                              $scope.dat_arr_renditions = [];
                                            for(var i=0; i< arr_renditions.length; i++){
                                             var obj = new Object;
                                                if(arr_renditions[i]['type'] != 'locked column'){
                                                    obj.id = arr_renditions[i]['id'];
                                                    obj.type = arr_renditions[i]['type'];
                                                    obj.columnname = arr_renditions[i]['columnname'];
                                                    obj.headertext = arr_renditions[i]['headertext'];
                                                    obj.bgcolor = arr_renditions[i]['bgcolor'];
                                                    $scope.dat_arr_renditions.push(obj);
                                                }
                                                
                                            };
                                           
                                        }
                  );
           
          
       }
       
      
      
      $scope.removeRow = function(r_idx,row) {
          
                    var index = $scope.dat_arr_userrenditions.indexOf(row.entity);
                  //  var index = r_idx;
                    
                    if ($scope.dat_arr_userrenditions[index]['type'] != 'locked column'){
                         $scope.dat_arr_userrenditions.splice(index, 1);
                    }
      };

       $scope.clearAll = function() {
                    var da_length = $scope.dat_arr_userrenditions.length;
                    for(var i=da_length - 1;i >= 0; i--){
                      
                          if ($scope.dat_arr_userrenditions[i]['type'] != 'locked column'){    
                              $scope.dat_arr_userrenditions.splice(i, 1);
                          }
                    }
      }; 
      $scope.addPanel = function(r_idx, row) {
              var index = $scope.dat_arr_userrenditions.indexOf(row.entity);
          if (row.entity.type == 'locked column'){
                       alert("Not allowed to create a Panel on a locked column");
                        return;
          }
          if (row.entity.type== 'panel'){
                       alert("Not allowed to create a Panel on a panel column");
                        return;
          }
          
          
               var modalInstance = $modal.open({
                            templateUrl: 'app/views/inputPanelRedefinePanelsandColumns.html',
                             controller: 'InputPanelRedefinePanelsandColumns',
                           size:'',
                            resolve: { 
                              loc_values: function () { 
                                //return loc_dispname; 
                              }
                            }
                          }).result.then(function(result) {
                                
                                 var obj = new Object;
                                                    obj.id = index;
                                                    obj.type ="panel";
                                                    obj.columnname = result;
                                                    obj.headertext = result;
                                                    obj.bgcolor = "green";
                                                    $scope.dat_arr_userrenditions.insert(index, obj);
               });
      };  
      
      Array.prototype.insert = function (index, item) {
                this.splice(index, 0, item);
                /*
                var arr = [ 'A', 'B', 'D', 'E' ];
                arr.insert(2, 'C');
                  */    

      };

      

      $scope.selectClick = function(row) {  
  // window.console && console.log(row.entity);
    //        console.log(row.entity.headertext);
            var obj = new Object();
         
         obj.id = row.entity.id;
         obj.type = row.entity.type;
         obj.columnname = row.entity.columnname;
         obj.headertext = row.entity.headertext;
         obj.bgcolor = row.entity.bgcolor;
         
         $scope.dat_arr_userrenditions.push(obj);
          
          
      };  
      
      
      
      
 
  
       var rowtpl='<div ng-class="{\'green\':row.entity.type==\'panel\'}"><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }" ui-grid-cell></div></div>';
      
      $scope.gridOptions_rendition = { 
          data: 'dat_arr_renditions',
          rowTemplate:rowtpl,
          rowHeight: 45,
           columnDefs: [ 
            {field: 'type', displayName: 'Panel/Column'}, 
            {field: 'headertext', displayName: 'Name'},
            {name: 'select', displayName: '',  cellTemplate: '<button    class="btn-warning  btn-l" ng-click="grid.appScope.selectClick(row)"  type="button">Select</button>  <span ng-bind="currentFocused"></span>'}
            ],
        };
      
      $scope.gridOptions_userrendition = {
          data: 'dat_arr_userrenditions',
          rowTemplate:rowtpl,
          rowHeight: 45,
          columnDefs: [ 
            {field: 'type', displayName: 'Panel/Column',
                cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                    
                    if (grid.getCellValue(row,col) === 'locked column') {
                            return 'red'; 
                    }
                    
                }
            },
            {field: 'headertext', displayName: 'Name'},
            {name: 'select', displayName: '',  cellTemplate: '<button    class="btn-warning  btn-l"  ng-click="grid.appScope.removeRow(rowRenderIndex,row)"  type="button">Remove</button>  <span ng-bind="currentFocused"></span>'},
            {name: 'addpanel', displayName: '',  cellTemplate: '<button    class="btn-warning  btn-l"  ng-click="grid.appScope.addPanel(rowRenderIndex,row)"  type="button">Add Panel</button>  <span ng-bind="currentFocused"></span>'}
           
              
            ], 
        };  
      
      $scope.okrendition =  function() {
      /*
           for(var i=0;i<arr_columns.length -1;i++){
                             var str1 = {}; 
                                str1 = {displayName: arr_columns[i]['title_header'],field: arr_columns[i]['datafield'],width:arr_columns[i]['width'], enableSorting: false};   
                                 console.log(str1);
                           all_column.push(str1);
                        } 
              
              */
                var ret_arr_userrendition = [];
                for(var x=0;x<$scope.dat_arr_userrenditions.length;x++){
                    
                                    var obj = new Object;
                                    obj.id = $scope.dat_arr_userrenditions[x]['id'];
                                    obj.type = $scope.dat_arr_userrenditions[x]['type'];
                                    obj.columnname = $scope.dat_arr_userrenditions[x]['columnname'];
                                    obj.headertext = $scope.dat_arr_userrenditions[x]['headertext'];
                                    obj.bgcolor = $scope.dat_arr_userrenditions[x]['bgcolor'];
                                    ret_arr_userrendition.push(obj);
                }
          $modalInstance.close(ret_arr_userrendition);
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
      init();
    };  
      RedefinePanelsAndColumnsCtrl.$inject = ['$scope', '$modal', '$modalInstance','XMLHeaderDocService','RenditionFactory','loc_values'];
    angular.module('myApp') 
    .controller('RedefinePanelsAndColumnsCtrl', RedefinePanelsAndColumnsCtrl);

}()); 


