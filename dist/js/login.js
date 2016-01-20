$(function(){
    'use strict';
    $(document).on('pageInit','#register',function(e, id, page){
        alert(id);
    })
    .on('pageInit','#login',function(e, id, page){
        alert(id);
    });
    
    $.init();
});