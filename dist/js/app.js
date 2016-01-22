$(function(){
    //加载flag
    var loading = false;
    //最多可加载的条目
    var maxItems = 100;
    //每次加载多少条
    var itemsPerLoad = 5;
    //上次加载的序号
    var lastIndex = 5;
    
    
    function addItems(number, lastIndex){
        var html = [];
        for(var i = lastIndex+1; i <= lastIndex+number; i++){
            html.push('<a class="product" href="detail.html">');
                html.push('<div class="row">');
                    html.push('<div class="col col-33">');
                        html.push('<img src="./images/iphone6s.png" alt="">');
                    html.push('</div>');
                    html.push('<div class="col-66">');
                                html.push('<p class="goods-title">Apple iPhone 6s 64G 玫瑰金版本</p>');
                        html.push('<div class="row">');
                            html.push('<div class="col-80">');
                                html.push('<p class="press">');
                                    html.push('<span class="cover" style="width:70%;"></span>');
                                html.push('</p>');
                                html.push('<p class="goods-title">');
                                    html.push('<span class="pull-left">总需5000人次</span>');
                                    html.push('<span class="pull-right">剩余500</span>');
                                html.push('</p>');
                            html.push('</div>');
                            html.push('<div class="col-20 text-center">');
                                html.push('<span class="icon icon-cart"></span>');
                            html.push('</div>');
                        html.push('</div>');
                    html.push('</div>');
                html.push('</div>');
            html.push('</a>');
        }
        //添加新条目
        $('.infinite-scroll-bottom .products').append(html.join(''));

    }
    
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
    $(document).on('pageInit','.currentPage',function(){
      
        // 添加'refresh'监听器
        $(document).on('refresh', '.pull-to-refresh-content',function(e) {
            var $this = $(this),
                id = this.id;
            
            //模拟2s的加载过程
            setTimeout(function() {
                if(id === 'center'){
                    var price = $this.find('.price'),
                        money = +price.html() + parseInt(Math.random()*100);
                    price.html(money);
                }
                // 加载完毕需要重置
                $.pullToRefreshDone('.pull-to-refresh-content'); 
            }, 2000);
            
        }).on('infinte','.infinte-scroll-bottom',function(){
            
            if(loading) return;
            
            loading = true;
            console.log(loading);
            setTimeout(function(){
                loading = false;
                
                if(lastIndex >= maxItems ){
                    // 加载完毕，则注销无限加载事件，以防不必要的加载
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    
                    // 删除加载提示符
                    $('.infinite-scroll-preloader').remove();
                    return;
                }
                
                // 添加新条目
                addItems(itemsPerLoad, lastIndex);
                // 更新最后加载的序号
                lastIndex = $('.list-container li').length;
                //容器发生改变,如果是js滚动，需要刷新滚动
                $.refreshScroller();
            },1000);
            
        });
        
    });
    
    
    $.init();
    
    

    
});