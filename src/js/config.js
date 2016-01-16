$.config = {
    routerFilter: function($link){
        if($link.is('.disable-route a') || $link.is('a.disable-route')){
            return false;
        }
        return true;
    }
};