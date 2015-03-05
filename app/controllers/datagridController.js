(function () {

  var MyCtrl = function($scope,$http, $modal, $log,sessionFactory,xmlHeaderDocFactory,datagridListFactory, XMLHeaderDocService,myViewFactory,UserRenditionFactory,UpdateRenditionFactory,GetGridHeaderDoc, FilterDetailFactory){
//angular.module('myApp').controller('MyCtrl', function ($scope,$http,$modal,sessionFactory,xmlHeaderDocFactory,datagridListFactory,sharedPropertyServices) {
    //$scope.xmlheaderdoccode = [];   
"use strict";
  var str = "";
  var sorted_columns = [];
  var filtered_columns = [];
      
  XMLHeaderDocService.setmainboard("RECEIPT"); 
  $scope.open = function (size) {



          if ($scope.gridApi.selection.getSelectedRows().length == 0){
                    var modalInstance = $modal.open({
                      templateUrl: 'app/views/myModalContent.html',
                      controller: 'ModalInstanceCtrl',
                      size: size,
                      resolve: {
                        items: function () {
                          return $scope.items;
                        } 
                      }
                    }).result.then(function(arrresult) {

                        if (arrresult[0] == 'sort') {

                              var result =  arrresult[1];
                                sorted_columns = [];
                                  var finalStr = "";
                                  var segregatedStrCol = "";
                                  var segregatedStrascdesc = "";
                                  for(i=0;i< (result).length;i++){
                                        var obj = new Object;
                                        obj.sortedcolumns = result[i]['sortedcolumns'] 
                                        obj.sortedvalues = result[i]['sortedvalues'] 
                                            sorted_columns.push(obj);
                                       for(x=0;x< ($scope.xmlheaderdoccode).length;x++){
                                          if (result[i]['sortedcolumns'] == $scope.xmlheaderdoccode[x]['displayName']){
                                                var flag = 'asc';
                                                if ( result[i]['sortedvalues'] == 'Descending'){
                                                    flag = 'desc';
                                                }
                                                 segregatedStrCol = $scope.xmlheaderdoccode[x]['field'] + ":" + '"'+flag +'"' + ',';
                                                finalStr = finalStr + segregatedStrCol;
                                                break;
                                          }
                                       }

                                    } 

                                      XMLHeaderDocService.setsortedcolumns(sorted_columns);
                                      finalStr = finalStr.substring(0,finalStr.length -1);
                                      obj = eval('({' + finalStr + '})');
                                      var sorto = obj;
                                      $scope.myData.keySort(sorto);
                          }
                          if (arrresult[0] == 'filter') {

                                          var result =  arrresult[1];
                                            filtered_columns = [];
                                              var finalStr = "";
                                              var segregatedStrCol = "";
                                              var segregatedStrascdesc = "";
                                              for(i=0;i< (result).length;i++){
                                                    var obj = new Object;
                                                    obj.filteredcolumns = result[i]['filteredcolumns'];
                                                    obj.filteredvalues = result[i]['filteredvalues'];
                                                    obj.keepdiscardmatches = result[i]['keepdiscardmatches'];
                                                  // remove the trailing ";"
                                                  //obj.filteredvalues = obj.filteredvalues.substr(0, obj.filteredvalues.length -1);
                                                    filtered_columns.push(obj);

                                                }
                                       // console.log(filtered_columns[0]['filteredcolumns'] + " " + filtered_columns[0]['filteredvalues'] + " " + filtered_columns[0]['keepdiscardmatches']);
                                            XMLHeaderDocService.setfilteredcolumns(filtered_columns);
                                             //$scope.myData.keyFilter(filtered_columns);    
                                             $scope.myData = $scope.array_zero;   
                                                XMLHeaderDocService.setarrayzero($scope.myData);
                                            KeyFilter();


                          }
                         if (arrresult[0] == 'panel') {
                             var col_loc = arrresult[1];
                              $scope.gridApi.cellNav.scrollTo( $scope.gridOptions.data[0], $scope.gridOptions.columnDefs[col_loc]);
                          }
                         if (arrresult[0] == 'spreadsheet') {
                                    if (arrresult[1] == 'csv') {
                                      var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
                                      $scope.gridApi.exporter.csvExport( 'all' , 'all', myElement );
                                    } else if (arrresult[1] == 'pdf') {
                                      $scope.gridApi.exporter.pdfExport( 'all' , 'all');
                                    };
                          }
                          if (arrresult[0] == 'redefinepanelsandsort') {
                           
                            
                              
                              UpdateRenditionFactory.getupdaterenditionFactory(XMLHeaderDocService.getsessionid(), arrresult[1])
                                    .success(
                                        function(xml) {
                                              var myJsonObject=xml2json.parser(xml);
                                                  var status = myJsonObject['ezware_response']['status'];
                                                if (status == 'OK'){
                                                    //console.log(status);
                                                    
                                                    GetGridHeaderDoc.getgridheaderDocFactory(XMLHeaderDocService.getsessionid())
                                                        .success(
                                                            function(res_sub_xml){
                                                               ///////////////////////////////////////////////////////////////////////////////
                                                                             var myJsonObject=xml2json.parser(res_sub_xml);

                                                                            /*  Single value elements */
                                                                             var lockcolumn = myJsonObject['ezware_response']['refresh_data']['root']['panel']['lockcolumn'];
                                                                             var rendcode = myJsonObject['ezware_response']['refresh_data']['root']['panel']['rendcode'];

                                                                            /* Set single value elements */
                                                                            XMLHeaderDocService.setmyviewcode(rendcode);  


                                                                            /*  Column Group */
                                                                            var arr_columns_group = myJsonObject['ezware_response']['refresh_data']['root']['advanceddatagridcolumngroup']['columngroup'];
                                                                            var all_column_group = [];    
                                                                            for(var x=0;x<arr_columns_group.length;x++){
                                                                                 var columnsgroup_str = {}; 

                                                                                    columnsgroup_str = {columnstart:arr_columns_group[x]['columnstart'], extensible: arr_columns_group[x]['extensible'], headertext: arr_columns_group[x]['headertext']};   
                                                                                    all_column_group.push(columnsgroup_str);
                                                                            } 

 

                                                                                    XMLHeaderDocService.setcolumngroups(all_column_group);

                                                                            /* Columns */
                                                                           var arr_columns = myJsonObject['ezware_response']['refresh_data']['root']['advanceddatagridcolumn']['column'];
                                                                           var all_column = [];
                                                                            //var str = "";
                                                                           for(var i=0;i<arr_columns.length -1;i++){
                                                                                 var str1 = {}; 
                                                                                    str1 = {displayName: arr_columns[i]['title_header'],field: arr_columns[i]['datafield'],width:arr_columns[i]['width'], enableSorting: false};   

                                                                               all_column.push(str1);
                                                                            }

                                                                            $scope.xmlheaderdoccode =  all_column;
                                                                            $scope.gridOptions.columnDefs  =  all_column;
                                                                            XMLHeaderDocService.setusers(all_column);
                                                                            getDataGridList( XMLHeaderDocService.getsessionid());
                                                                ////////////////////////////////////////////////////////////////////////////
                                                            }
                                                        );
                                                }
                                            
                                             
                                        });
                                
                              
                              
                          } 
                     
                        
                        /*
                        var arr_ret_sort = [];
              arr_ret_sort[0] = 'panel'; 
              arr_ret_sort[1] = result;

                $modalInstance.close(arr_ret_sort);
                        
                        */
                        
                         if (arrresult[0] == 'selectall') {
                            
                                    $scope.gridApi.selection.selectAllRows();
                          }
                
                    });
          }
          if ($scope.gridApi.selection.getSelectedRows().length > 0){
                    var modalInstance = $modal.open({
                      templateUrl: 'app/views/myModalContentWithSelect.html',
                      controller: 'ModalInstanceCtrlWithClick',
                      size: size,
                      resolve: {
                        items: function () {
                          return $scope.items;  
                        } 
                      }
                    }).result.then(function(arrresult) { 
                                          if (arrresult[0] == 'unselectrows') {
                                                 $scope.gridApi.selection.clearSelectedRows();  
                                          }
                                          if (arrresult[0] == 'panel') {
                                             console.log(arrresult[1]);
                                             var col_loc = arrresult[1];
                                              $scope.gridApi.cellNav.scrollTo( $scope.gridOptions.data[0], $scope.gridOptions.columnDefs[col_loc]);
                                          }
                    });
          }
  };

// FILTER!!!!!! ///////////////////////////////
        var gl_filteredcolumns = "";
        var gl_kd = "";
        var gl_arr_loc_fv = "";
        var gl_array_loc_fv = [];
        function KeyFilter(){
        
           // $scope.myData = $scope.myData.filter(filterFunc);
            
             for(var i = 0; i < filtered_columns.length; i++) {
                 
                
                var loc_fc  =  XMLHeaderDocService.getfieldname(filtered_columns[i]['filteredcolumns']);
                 gl_filteredcolumns = loc_fc
                var loc_fv  = filtered_columns[i]['filteredvalues'];
                 // remove the trailing ";"
                var res = loc_fv.substring(loc_fv.length, loc_fv.length -1);
                if (res == ";"){
                    loc_fv = loc_fv.substr(0, loc_fv.length -1);
                }
                // loc_fv = loc_fv.substr(0, loc_fv.length -1);
                var loc_kd  = filtered_columns[i]['keepdiscardmatches'];
                 gl_kd = loc_kd;
                var array_loc_fv = loc_fv.split(';'); // returns an array;
                 gl_array_loc_fv = array_loc_fv;
                 
                     $scope.myData = $scope.myData.filter(filterFunc);
                 
                 
             }
            
            XMLHeaderDocService.setarrayzero($scope.myData);
        }
        function filterFunc(element, value, index, ar) {
          
                for(var x = 0; x < gl_array_loc_fv.length; x++) {
                         //  console.log(gl_array_loc_fv[x] + " : " +  element[gl_filteredcolumns]);
                            if (gl_array_loc_fv[x] == element[gl_filteredcolumns]){ 
                           
                            
                                if (gl_kd == 'Keep'){
                                    return 1;
                                } 
                                 /*
                                if (gl_kd == 'Discard'){
                                    return 0;
                                }   
                                   */

                                /*
                                if (gl_kd == 'Keep'){
                                    return 1;
                                } else {
                                    return 0;
                                }
                                */
                            } 
                    
                    
                            if (gl_array_loc_fv[x] != element[gl_filteredcolumns]){ 
                          

                                if (gl_kd == 'Discard'){
                                    return 1;
                                } 
                                 /*
                                if (gl_kd == 'Discard'){
                                    return 0;
                                }   
                                   */

                                /*
                                if (gl_kd == 'Keep'){
                                    return 1;
                                } else {
                                    return 0;
                                }
                                */
                            } 
                        
                }
        }
      
      
      
      
      
      
      
      
// SORT ! ///////////////////////////////////////
      Array.prototype.keySort = function(keys) {
      keys = keys || {};
      var obLen = function(obj) {
          var size = 0, key;
          for (key in obj) {
              if (obj.hasOwnProperty(key))
                  size++;
          }
          console.log(size);
          return size;
      };

      // avoiding using Object.keys because I guess did it have IE8 issues?
      // else var obIx = function(obj, ix){ return Object.keys(obj)[ix]; } or
      // whatever
      var obIx = function(obj, ix) {
          var size = 0, key;
          for (key in obj) {
              if (obj.hasOwnProperty(key)) {
                  if (size == ix)
                      return key;
                  size++;
              }
          }
          return false;
      };

      var keySort = function(a, b, d) {
          d = d !== null ? d : 1;
          // a = a.toLowerCase(); // this breaks numbers
          // b = b.toLowerCase();
          if (a == b)
              return 0;
          return a > b ? 1 * d : -1 * d; 
         //   return a > b ? 1 * d : -1 * d;
      }; 
      var KL = obLen(keys);
      if (!KL)
          return this.sort(keySort);
      for ( var k in keys) {
          // asc unless desc or skip
          keys[k] = 
                  keys[k] == 'desc' || keys[k] == -1  ? -1 
                : (keys[k] == 'skip' || keys[k] === 0 ? 0 
                : 1);
      }
      this.sort(function(a, b) {
          var sorted = 0, ix = 0;
          while (sorted === 0 && ix < KL) {
              var k = obIx(keys, ix);
              if (k) {
                  var dir = keys[k];
               //   console.log("a[k]: " + a[k] + " b[k]: " +  b[k] + " dir: "  + dir);
                  sorted = keySort(a[k], b[k], dir);
                  ix++;
              }
          }
          return sorted;
      });
      return this;
      };


function objSort() {
    var args = arguments,
        array = args[0],
        case_sensitive, keys_length, key, desc, a, b, i;
console.log("DataType: " + typeof arguments[arguments.length - 1] );
    if (typeof arguments[arguments.length - 1] === 'boolean') {
        case_sensitive = arguments[arguments.length - 1];
        keys_length = arguments.length - 1;
    } else {
        case_sensitive = false;
        keys_length = arguments.length;
    }

    return array.sort(function (obj1, obj2) {
        for (i = 1; i < keys_length; i++) {
            key = args[i];
            if (typeof key !== 'string') {
                desc = key[1];
                key = key[0];
                a = obj1[args[i][0]];
                b = obj2[args[i][0]];
            } else {
                desc = false;
                a = obj1[args[i]];
                b = obj2[args[i]];
            }

            if (case_sensitive === false && typeof a === 'string') {
                a = a.toLowerCase();
                b = b.toLowerCase();
            }

            if (! desc) {
                if (a < b) return -1;
                if (a > b) return 1;
            } else {
                if (a > b) return -1;
                if (a < b) return 1;
            }
        }
        return 0;
    });
} //end of objSort() function

    function init(){
          
         
       
        
            var sessionid = "";
            sessionFactory.getsesid()
                .success(
                    function( xml ) {
                        var doc = StringtoXML(xml);
                        var ezware_response = doc.getElementsByTagName("ezware_response");

                        for(var i = 0; i < ezware_response.length; i++) {
                            var ezware_resp = ezware_response[i];
                            var sid = ezware_resp.getElementsByTagName("sid");
                            sessionid = ( sid[i].childNodes[0].nodeValue);
                           // console.log(sessionid);
                            //_sid= sid[i].childNodes[0].nodeValue;
                            XMLHeaderDocService.setsessionid(sessionid);
                             getXMLHeaderDocCode(sessionid);
                            break;
                       }
                    }
                )
                //.error(function(data, status, headers, config){
                  .error(function(status, headers, config){
                    // error handling.
                });
        }
          function getXMLHeaderDocCode(sesid){
            xmlHeaderDocFactory.getxmlheaderdoccode(sesid, XMLHeaderDocService.getmainboard())
                .success(
                    function( xml ) {
                       var myJsonObject=xml2json.parser(xml);
                        
                        /*  Single value elements */
                        var mb_code = myJsonObject['ezware_response']['refresh_data']['root']['panel']['code'];
                        var mb_title = myJsonObject['ezware_response']['refresh_data']['root']['panel']['title'];
                        var lockcolumn = myJsonObject['ezware_response']['refresh_data']['root']['panel']['lockcolumn'];
                        var rendcode = myJsonObject['ezware_response']['refresh_data']['root']['panel']['rendcode'];
                        var mb_renddesc = myJsonObject['ezware_response']['refresh_data']['root']['panel']['renddesc'];
                        var mb_rendbtnlabel = myJsonObject['ezware_response']['refresh_data']['root']['panel']['mb_rendbtnlabel'];
                        var mb_dynamicindicator = myJsonObject['ezware_response']['refresh_data']['root']['panel']['mb_dynamicindicator'];
                        var mb_extsble_gd = myJsonObject['ezware_response']['refresh_data']['root']['panel']['mb_extsble_gd'];
                        
                        
                        
                        /* Set single value elements */
                       
                        XMLHeaderDocService.setmyviewcode(rendcode);  
                        
                        
                        /*  Column Group */
                        var arr_columns_group = myJsonObject['ezware_response']['refresh_data']['root']['advanceddatagridcolumngroup']['columngroup'];
                        var all_column_group = [];    
                        for(var x=0;x<arr_columns_group.length;x++){
                             var columnsgroup_str = {}; 
                            
                                columnsgroup_str = {columnstart:arr_columns_group[x]['columnstart'], extensible: arr_columns_group[x]['extensible'], headertext: arr_columns_group[x]['headertext']};   
                                all_column_group.push(columnsgroup_str);
                        } 
                        
                      
                        
                                XMLHeaderDocService.setcolumngroups(all_column_group);
                        
                        /* Columns */
                       var arr_columns = myJsonObject['ezware_response']['refresh_data']['root']['advanceddatagridcolumn']['column'];
                       var all_column = [];
                        //var str = "";
                       for(var i=0;i<arr_columns.length -1;i++){
                             var str1 = {}; 
                                str1 = {displayName: arr_columns[i]['title_header'],field: arr_columns[i]['datafield'],width:arr_columns[i]['width'], enableSorting: false};   
                                
                           all_column.push(str1);
                        }
                         
                        $scope.xmlheaderdoccode =  all_column;
                        $scope.gridOptions.columnDefs  =  all_column;
                        XMLHeaderDocService.setusers(all_column);
                        getDataGridList(sesid);

                    }
                )
                  .error(function(status, headers, config){
                        // error handling.
                    });
            }

      var x2js = new X2JS();
            function getDataGridList(sesid){
                  datagridListFactory.getlist(sesid, XMLHeaderDocService.getmainboard(), XMLHeaderDocService.getmyviewcode())
                                          .success(
                                        function (xml) {
                                            var data;

                                            var jsonObj = x2js.xml_str2json(xml);
                                            var arr_rows = jsonObj['ezware_response']['refresh_data']['RECEIPT']['data'];
                                             XMLHeaderDocService.setarrayzero(arr_rows);
                                            $scope.array_zero = arr_rows;
                                            $scope.myData = $scope.array_zero;
                                        } 

                                       );
                getMyViewList(sesid);
            }
      
      
             function getMyViewList(sesid){
                  myViewFactory.getmyviewfactory(sesid, XMLHeaderDocService.getmainboard())   
                                          .success(
                                        function (xml) {
                                            var data; 
                                            var jsonObj = x2js.xml_str2json(xml);
                                            var arr_myviews = jsonObj['ezware_response']['refresh_data']['myviews']['myview'];
                                             XMLHeaderDocService.setmyviewslist(arr_myviews);
                                        } 
                  );
                getUserRendition(sesid); 
            }
            
            function getUserRendition(sesid){
                  UserRenditionFactory.getuserrenditionFactory(sesid,XMLHeaderDocService.getmyviewcode())   
                                          .success(
                                        function (xml) {
                                            
                                            var jsonObj = x2js.xml_str2json(xml);
                                            var arr_userrendition = jsonObj['ezware_response']['refresh_data']['RENDITION']['data'];
                                         //   console.log("arr_userrendition: " +arr_userrendition.length);
                                             XMLHeaderDocService.setuserrenditionlist(arr_userrendition);
                                             
                                        }
                  );
                getFilterDetail(sesid);
            }
      
            function getFilterDetail(sesid){
                FilterDetailFactory.getfilterdetailFactory(sesid,XMLHeaderDocService.getmyviewcode())
                                    .success(
                                        function (xml) {
                                            
                                          console.log(xml);
                                             
                                        }
                  );
                
                /*
                  UserRenditionFactory.getuserrenditionFactory(sesid,XMLHeaderDocService.getmyviewcode())   
                                          .success(
                                        function (xml) {
                                            
                                            var jsonObj = x2js.xml_str2json(xml);
                                            var arr_userrendition = jsonObj['ezware_response']['refresh_data']['RENDITION']['data'];
                                         //   console.log("arr_userrendition: " +arr_userrendition.length);
                                             XMLHeaderDocService.setuserrenditionlist(arr_userrendition);
                                             
                                        }
                  );
                  */
            }

    $scope.gridOptions = {
      data:'myData', 
        enableSelectAll: true,
      enableRowSelection: true, enableRowHeaderSelection: false, 
          rowHeight: 40,
      
    exporterPdfDefaultStyle: {fontSize: 9},
  //  exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500
      
    };
    $scope.gridOptions.onRegisterApi = function( gridApi ) {
        $scope.gridApi = gridApi;
        
        
       
    };

   $scope.gridOptions.multiSelect = true;
   $scope.gridOptions.modifierKeysToMultiSelectCells = true;
   $scope.gridOptions.noUnselect = false;
      
      
    
    init();
  };


    MyCtrl.$inject = ['$scope','$http', '$modal', '$log','sessionFactory','xmlHeaderDocFactory','datagridListFactory','XMLHeaderDocService','myViewFactory','UserRenditionFactory','UpdateRenditionFactory','GetGridHeaderDoc','FilterDetailFactory'];  
    angular.module('myApp') 
    .controller('MyCtrl', MyCtrl);
}());


/*


app.factory("XMLHeaderDocService", function() {
 var users = [];
 var loc_sortedcolumns = [];
 var loc_filteredcolumns = [];
 var loc_Array_zero = [];


  return {
    all: function() {
      return users;
    },
    first: function() {
      return users[0];
    },
    setusers: function(value){
      users = [];
      //users.push(value)
      users = value;
    },
    getfieldname: function(value){
      var datafieldvalue;
             for(i=0;i< (users).length;i++){
                  if (value == users[i]['displayName']){
                        datafieldvalue = users[i]['field'];
                        break;
                  }
             }
             return datafieldvalue; 
    }, 


    allsortedcolumns: function() { 
      return loc_sortedcolumns;
    },
    firstsortedcolumns: function() {
      return loc_sortedcolumns[0];
    },
    setsortedcolumns: function(value){
      loc_sortedcolumns = [];
      //users.push(value)
      loc_sortedcolumns = value;
    
    },
      allfilteredcolumns: function() { 
      return loc_filteredcolumns;
    },
    firstfilteredcolumns: function() {
      return loc_filteredcolumns[0];
    },
    setfilteredcolumns: function(value){
      loc_filteredcolumns = [];
      //users.push(value)
      loc_filteredcolumns = value;
    
    },
 



 
    allarrayzero: function() { 
      return loc_Array0;
    },

    arrayzerofilter: function(filter_value) { 
     // var loc_filtervalue_res = [];
      var loc_transient_rec = [];
//loc_transient_rec.push('83');
                                 for(x=0;x< (loc_Array_zero).length;x++){
                                         // console.log("X: " + loc_Array_zero[x][filter_value]);      
                                            var flag = false;
                                           
                                            var obj = new Object;
                                            
                                           for(y=0;y< (loc_transient_rec).length;y++){

                                           //     console.log("Y: " + loc_transient_rec[x]); 
                                                     
                                            
                                                  if (loc_transient_rec[y] == loc_Array_zero[x][filter_value]){
                                                         //console.log("BINGO!!!!!!!!!!!!!!!!!!!!! " + loc_Array_zero[x][filter_value]);
                                                          flag = true;
                                                          break;
                                                  }
                                                  
                                           }
                                           
                                           if (flag == false){
                                              loc_transient_rec.push(loc_Array_zero[x][filter_value]);
                                           }
                                           

                                 }

                              

      return loc_transient_rec;
    },
    setarrayzero: function(value){
      loc_Array_zero = [];
      //users.push(value)
      loc_Array_zero = value;
      //console.log("NUMBER OF loc_Array_zero: " + loc_Array_zero.length);
    }
  };
});

*/

/*
app.controller('SecondCtrl', ['$scope', '$http',  function ($scope, $http) {
  
$scope.gridOptions_test = { enableRowHeaderSelection: false };
  $scope.gridOptions_test.columnDefs = [
    { name: 'id' },
    { name: 'name'},
    { name: 'age', displayName: 'Age (not focusable)', allowCellFocus : false },
    { name: 'address.city' }
  ];


  $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
    .success(function(data) {
      $scope.gridOptions_test.data = data;
      
      // $interval whilst we wait for the grid to digest the data we just gave it
     // $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);
    });
}]);   */