$.config = {
    routerFilter: function($link){
        if($link.is('.disable-route a')){
            return false;
        }
        return true;
    }
};