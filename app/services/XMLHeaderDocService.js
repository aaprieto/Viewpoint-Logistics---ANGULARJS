app.factory("XMLHeaderDocService", function() {
 var loc_sessionid = "";
 var users = [];
 var loc_sortedcolumns = [];
 var loc_filteredcolumns = [];
 var loc_Array_zero = [];
 var loc_columngroup = [];
 var loc_myviewslist = [];
 var loc_myviewcode = "";
 var loc_userrenditionlist = [];
 var loc_mainboard = "";
 var loc_rendcode = "";

  return {
      
      
   
      
      
    setmainboard: function(value){
        
      loc_mainboard = "";
      loc_mainboard = value;
    },   
    getmainboard: function() {
      return loc_mainboard;
    }, 
    
      
      
      
      
    setuserrenditionlist: function(value){
      loc_userrenditionlist = "";
      loc_userrenditionlist = value;
    },   
    getuserrenditionlist: function() {
      return loc_userrenditionlist;
    }, 
    
      
      
      
    setmyviewcode: function(value){
      loc_myviewcode = "";
      loc_myviewcode = value;
    },   
    getmyviewcode: function() {
      return loc_myviewcode;
    }, 
      
      
      
    setsessionid: function(value){
      loc_sessionid = "";
      loc_sessionid = value;
    },   
    getsessionid: function() {
      return loc_sessionid;
    },   
      
    setmyviewslist: function(value){
      loc_myviewslist = [];
      loc_myviewslist = value;
    },  
    getmyviewslist: function() {
      return loc_myviewslist;
    },   
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
    setcolumngroups:function(value){
        loc_columngroup = [];
        loc_columngroup = value;
    },  
    getcolumngroups: function() {
      return loc_columngroup;
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
      var loc_transient_rec = [];
                                 for(x=0;x< (loc_Array_zero).length;x++){
                                            var flag = false;
                                            var obj = new Object;
                                           for(y=0;y< (loc_transient_rec).length;y++){
                                                  if (loc_transient_rec[y] == loc_Array_zero[x][filter_value]){
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
      loc_Array_zero = value;
    }
  };
});
