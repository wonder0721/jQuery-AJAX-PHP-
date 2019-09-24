$(function () {

    function init(){
        // 菜单页
        $.ajax({
            url:'./menu.php',
            type:'get',
            success:function(xhr){
                $('#info').html(xhr)
                $('#info').addClass('bg')
            },
            error:function(xhr){
                console.log(xhr.status)
            }
        })
        // 添加每个幽灵按钮点击跳转对应的目录效果,通过on方法的事件委托
        $('body').on('click','#movie',function(e){
            e.preventDefault()
            $('.has-submenu .menu-title').eq(0).click()
            $('.cartoon').find('li').first().click()
        })
        $('body').on('click','#weather',function(e){
            e.preventDefault()
            $('.has-submenu .menu-title').eq(1).click()
            $('.weather').find('li').first().click()
        })
        $('body').on('click','#book',function(e){
            e.preventDefault()
            $('.has-submenu .menu-title').eq(2).click()
            $('.book').find('li').first().click()
        })
        $('body').on('click','#search',function(e){
            e.preventDefault()
            $('.has-submenu .menu-title').eq(3).click()
            $('.news').find('li').first().click()
        })
        $('body').on('click','#game',function(e){
            e.preventDefault()
            $('.has-submenu .menu-title').eq(4).click()
            $('.game').find('li').first().click()
        })   
    }

    // 初始化页面
    init()
        
    // 左侧导航栏的滑动效果
    $('.has-submenu .menu-title').on('click',function(e){
        e.preventDefault()
        if ($(this).hasClass('active')){
            $(this).next().stop().slideUp()
            $(this).removeClass('active')
        }
        else{
            $(this).next().stop().slideDown()
            .parent().siblings().children('.menu-title')
            .next().slideUp();
            $(this).addClass('active')
            $(this).parent().siblings().children('.menu-title').removeClass('active')
        }  
    })

    // sub-menu的动效
    $('.submenu').children('li').on('click',function(){
            $(this).addClass('sub-menu-active')
            .siblings().removeClass('sub-menu-active')
            $(this).parents('.has-submenu').siblings().find('li').removeClass('sub-menu-active')
        }
    )

    // 给对应的li添加相应的index属性，便于ajax传参
    var pageList = $('.cartoon').find('li')
    var pageArr = Array.from(pageList)
    pageArr.forEach(function(item,i){
        item.index = i + 1
    })

    // 动画页面 
    $('.cartoon').find('li').on('click',function(e){
        e.preventDefault()
        document.documentElement.scrollTop = 0
        var index = this.index
        $.ajax({
            url: `http://cache.video.iqiyi.com/jp/avlist/202861101/${index}/`,
            jsonp: 'callback',
            dataType: 'jsonp',
            success: function (xhr) {
                var arr = xhr.data.vlist
                // console.log(arr)
                var tag = '<ul class="aiqiyi">'
                arr.forEach(function (item, i) {
                    tag += `<a href="${item.vurl}" target="_blank" title="${item.vt}">
                                <div class="micro-career-img">
                                    <img src="${item.vpic}" alt="403(Forbidden)">
                                </div>
                                <div class="micro-career-container">
                                    <h4>${item.shortTitle}</h4>
                                    <span>${item.vt}</span>
                                </div>
                            </a>`
                })
                tag += '</ul>'
                $('#info').html(tag).removeClass('bg')
                $('#info').css({'backgroundColor':'lightblue'})
            },
            error: function (xhr) {
                console.log(xhr.status)
            }
        })
    }) 

    // 天气页面
    $('.weather').children().on('click',function(e){
        e.preventDefault()
        $.ajax({
            url:'./weather.php',
            type:'get',
            success:function(xhr){
                $('#info').html(xhr).removeClass('bg').css({'backgroundColor':'#CCFFFF'})
                $(function(){
                    $('#city').focus()
                    $('#submit').on('click',function(){
                        var name = $('#city').val()
                        var cityCode = ''
                        $.ajax({
                            type:'get',
                            url:'./_city.json',
                            dataType:'json',
                            success:function(xhr){
                                // 根据对应的json数据查找相应的城市id
                                var length = xhr.length
                                for (let i = 0; i < length; i++) {
                                    if (xhr[i]['city_name'] === name) {
                                        cityCode = xhr[i]['city_code']
                                    }  
                                }
                                if (cityCode === '') {
                                    alert('没有相关城市信息，请重新输入')
                                }
                                else {
                                    // console.log(cityCode)
                                    $.ajax({
                                        type:'get',
                                        url:'./weatherinfo.php',
                                        data:{city:cityCode},
                                        dataType:'json',
                                        success:function(res){
                                            var weatherObj = res.data
                                            // console.log(weatherObj)
                                            // 将服务器返回的数据进行处理
                                            var obj = weatherObj.forecast[0]
                                            for (var i in obj) {
                                                weatherObj[i] = obj[i]
                                            }
                                            var arr = weatherObj.forecast
                                            arr.shift()
                                            arr.splice(6)
                                            weatherObj.forecast = arr
                                            var result = template('weatherTemp',weatherObj)
                                            $('.weather-wrapper').remove()
                                            $('#info').append(result)
                                        },
                                        error:function(res){
                                            console.log(res.status)
                                        }
                                    })
                                }
                            },
                            error:function(xhr){
                                console.log(xhr.status)
                            }
                        })
                    })
                })   
            },
            error:function(xhr){
                console.log(xhr.status)
            }
        }) 
    })
    

    // 书籍页面
    $('.book').children().on('click',function(e){
        e.preventDefault()
        document.documentElement.scrollTop = 0
        var id = $(this).find('a').attr('id')
        $.ajax({
            type:'get',
            url:'./book.php',
            data:{bookId:id},
            dataType:'json',
            success:function(res){
                var bookObj = res.result
                var bookObj = getJdUrl(bookObj)
                console.log(bookObj)
                var result = template('bookTemp',bookObj)
                $('#info').html(result).removeClass('bg').css({'backgroundColor':'#fff'})
            },
            error:function(xhr){
                console.log(xhr.status)
                alert('请求出错，请稍后再试~')
            }
        })
    })
    
    // 新闻页面
    $('.news').children().on('click',function(e){
        e.preventDefault()
        document.documentElement.scrollTop = 0
        var type = $(this).find('a').attr('type')
        $.ajax({
            type:'get',
            url:'./news.php',
            data:{type:type},
            dataType:'json',
            success:function(res){
                var newsObj = res.result
                var newsData = template('newsTemp',newsObj)
                $('#info').html(newsData).removeClass('bg').css({'backgroundColor':'#eee'})
            },
            error:function(res){
                alert('请求出错，请稍后再试~')
            }
        })
    })

    // 贪吃蛇
    $('.game').children().eq(0).on('click',function(e){
        e.preventDefault()
        $.ajax({
            url:'./she.php',
            type:'get',
            success:function(xhr){
                $('#info').html(xhr).removeClass('bg').css({'backgroundColor':'#333'})
                $.getScript('./lib/she.js')
            },
            error:function(xhr){
                console.log(xhr.status)
            }
        })
    }) 


    $('.game').children().eq(1).on('click',function(e){
        e.preventDefault()
        $.ajax({
            url:'./lei.php',
            type:'get',
            success:function(xhr){
                $('#info').html(xhr).removeClass('bg').css({'backgroundColor':'lightgreen'})
                $.getScript('./lib/lei.js')
            },
            error:function(xhr){
                console.log(xhr.status)
            }
        })
    }) 

    this.resizeTimer = null
    this.scrollTimer = null
    // 根据浏览器高度自适应左侧导航栏高度
    // 函数防抖
    function windowSizeChange(){
        var h = window.innerHeight - 30 + 'px'
        var mainH = window.innerHeight - 60 + 'px'
        $('.sidebar').css({'height':h})
        $('.main').css({'min-height':mainH})
    }
    windowSizeChange()
    window.addEventListener('resize',function(){
        if (this.resizeTimer){
            this.clearTimeout(this.resizeTimer)
        }
        this.resizeTimer = this.setTimeout(function(){
            // console.log('resize')
            windowSizeChange()
        },100)
    })

    // 回到顶部功能
    // 函数节流
    window.addEventListener('scroll',function(){
        if (this.scrollTimer){
            return 
        }
        this.scrollTimer = setTimeout(function(){
            // console.log('scroll')
            if (document.documentElement.scrollTop >= 500) {
                $('.go-top').css({'display':'block'})
            }
            else {
                $('.go-top').css({'display':'none'})
            }
            this.scrollTimer = null
        },300)
    })  
    $('body').on('click','.go-top',function(){
        var d = Math.ceil(document.documentElement.scrollTop/100)
        timer = setInterval(function(){
            if(document.documentElement.scrollTop == 0){
                clearInterval(timer);
            }
            else{
                document.documentElement.scrollTop -= d;
            }
        },10);
    })

    $(document).ajaxStart(function(){
        $('.loading').show();
    })
    $(document).ajaxComplete(function(){
        $('.loading').hide();
    })

    function getJdUrl(obj){
        var regJd = /(http|ftp|https):\/\/(\w)+\.(\w)+\.(\w)+\/(\d)+\.(html)/
        var dataArr = obj.data
        dataArr.forEach(function(item){
            if (regJd.test(item.online)){
                item.online = item.online.match(regJd)[0]
            }
            else {
                item.online = "http://book.dangdang.com"
            }
        })
        return obj
    }
})