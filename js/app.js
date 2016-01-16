$(function(){
    
    $.reinitSwiper('.current-page');

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
    //$(document).on('refresh', '.pull-to-refresh-content',function(e) {
        // 模拟2s的加载过程
        //setTimeout(function() {
            // var cardNumber = $(e.target).find('.card').length + 1;
            // var cardHTML =  '<div class="card">' +
            //                 '<div class="card-header">card'+cardNumber+'</div>' +
            //                 '<div class="card-content">' +
            //                     '<div class="card-content-inner">' +
            //                         '这里是第' + cardNumber + '个card，下拉刷新会出现第' + (cardNumber + 1) + '个card。' +
            //                         '</div>' +
            //                     '</div>' +
            //                 '</div>';

            // $(e.target).find('.card-container').prepend(cardHTML);
            // // 加载完毕需要重置
            // $.pullToRefreshDone('.pull-to-refresh-content'); 
        //}, 2000);
        
    //});
    
    $.init();
    
    

    
});