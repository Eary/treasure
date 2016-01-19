$(function(){
    //$.reinitSwiper('.current-page');
    $(".swiper-container").swiper({
        initialSlide:0,
        autoplay:2000,                      //自动播放间隔
        autoplayDisableOnInteraction:false, //拖动后是否禁用自动播放
        speed:500,                          //过渡时间
        //effect:'slide',                   //动画效果:slide/fade/cube/coverflow
        paginationClickable:true,
        pagination:'.swiper-pagination',
        lazyLoading:true,
        lazyLoadingInPrevNext:true,
        lazyLoadingOnTransitionStart:true
    });
    
    // 添加'refresh'监听器
    $(document).on('refresh', '.pull-to-refresh-content',function(e) {
        var $this = $(this),
            id = this.id;
        
        //模拟2s的加载过程
        setTimeout(function() {
            if(id === 'center'){
                var price = $this.find('.price'),
                    money = +price.html() + +(Math.random()*100).toFixed(2);
                price.html(money);
            }
            // 加载完毕需要重置
            $.pullToRefreshDone('.pull-to-refresh-content'); 
        }, 2000);
        
    });
    
    $.init();
    
    

    
});