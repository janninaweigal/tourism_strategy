// textarea高度自适应
$(function(){
    $('.content').flexText();
})
// textarea限制字数
function keyUP(t){
    var len = $(t).val().length;
    if(len > 139){
        $(t).val($(t).val().substring(0,140));
    }
}
// 点击评论创建评论条
$('.commentAll').on('click','.plBtn',function(){
    //获取输入内容
    var oSize = $(this).parents('.form-group').prev().find('.comment-input').val();
    if(oSize.length==0){
        alert("请填写评论~")
        return;
    }
    $.ajax({
        url: "/community/insert",
        type: 'POST',
        data: {
            Content:oSize
        },
        headers:{
            'Authorization':'Bearer '+sessionStorage.getItem('webToken')
        },
        cache: false,
        success: function (res) {
            if(res.code==1){
                var myDate = new Date();
                //获取当前年
                var year=myDate.getFullYear();
                //获取当前月
                var month=myDate.getMonth()+1;
                //获取当前日
                var date=myDate.getDate();
                var h=myDate.getHours();       //获取当前小时数(0-23)
                var m=myDate.getMinutes();     //获取当前分钟数(0-59)
                if(m<10) m = '0' + m;
                var s=myDate.getSeconds();
                if(s<10) s = '0' + s;
                var now=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
                //动态创建评论模块
                oHtml = `<div class="comment-show-con clearfix"><div class="comment-show-con-img pull-left"><img src="${res.data.avatar}" alt=""></div> <div class="comment-show-con-list pull-left clearfix"><div class="pl-text clearfix"> <a href="#" class="comment-size-name">${res.data.username} : </a> <span class="my-pl-con">&nbsp;${oSize}</span> </div> <div class="date-dz"> <span class="date-dz-left pull-left comment-time">${now}</span> <div class="date-dz-right pull-right comment-pl-block"><a href="javascript:;" data-id="${res.data.insertId}" class="removeBlock">删除</a> <a href="javascript:;" data-id="${res.data.insertId}" data-pid="0" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a> <span class="pull-left date-dz-line">|</span> <a href="javascript:;" class="date-dz-z pull-left" data-id="${res.data.insertId}"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">0</i>)</a> </div> </div><div class="hf-list-con"></div></div> </div>`;
                if(oSize.replace(/(^\s*)|(\s*$)/g, "") != ''){
                    $('.commentAll .comment-show').prepend(oHtml);
                    $(this).parents('.form-group').prev().find('.comment-input').val('')
                }
            }
            alert(res.msg)
        },
        fail: function () {
            alert('评论失败')
        },
        error: function (error) {
            alert(error.responseJSON.msg)
        }
    })
});
// 回复的动态创建回复块
$('.comment-show').on('click','.pl-hf',function(){
    //获取回复人的名字
    var fhName = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.pl-text').find('.comment-size-name').html();
    //回复@
    var fhN = '回复@'+fhName+"  ";
    //var oInput = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.hf-con');
    var fhHtml = '<div class="hf-con pull-left"> <textarea class="content comment-input hf-input" placeholder="" onkeyup="keyUP(this)"></textarea> <a href="javascript:;" class="hf-pl">评论</a></div>';
    //显示回复
    if($(this).is('.hf-con-block')){
        $(this).parents('.date-dz-right').parents('.date-dz').append(fhHtml);
        $(this).removeClass('hf-con-block');
        $('.content').flexText();
        $(this).parents('.date-dz-right').siblings('.hf-con').find('.pre').css('padding','6px 15px');
        //input框自动聚焦
        $(this).parents('.date-dz-right').siblings('.hf-con').find('.hf-input').val('').focus().val(fhN);
    }else {
        $(this).addClass('hf-con-block');
        $(this).parents('.date-dz-right').siblings('.hf-con').remove();
    }
});
// 评论回复块创建
$('.comment-show').on('click','.hf-pl',function(){
    var oThis = $(this);
    //获取输入内容
    var Content = $(this).siblings('.flex-text-wrap').find('.hf-input').val();
    var oHfName = $(this).parents('.hf-con').parents('.date-dz').siblings('.pl-text').find('.comment-size-name').html();
    var oAllVal = '回复@'+oHfName;
    if(Content.replace(/^ +| +$/g,'') == '' || Content == oAllVal){

    }else {
        const parentDiv = oThis.parents('.hf-con').siblings('.date-dz-right').find('.pl-hf');
        const id = parentDiv.attr('data-id')
        const parentId = parentDiv.attr('data-pid')
        $.ajax({
            url: "/community/reply/"+id,
            type: 'POST',
            data: {
                parentId:parentId,
                Content:Content
            },
            headers:{
                'Authorization':'Bearer '+sessionStorage.getItem('webToken')
            },
            cache: false,
            success: function (res) {
                if(res.code==1){
                    var myDate = new Date();
                    //获取当前年
                    var year=myDate.getFullYear();
                    //获取当前月
                    var month=myDate.getMonth()+1;
                    //获取当前日
                    var date=myDate.getDate();
                    var h=myDate.getHours();       //获取当前小时数(0-23)
                    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
                    if(m<10) m = '0' + m;
                    var s=myDate.getSeconds();
                    if(s<10) s = '0' + s;
                    var now=year+'-'+month+"-"+date+" "+h+':'+m+":"+s;
                    var oHtml = `<div class="all-pl-con"><div class="pl-text hfpl-text clearfix"><a href="#" class="comment-size-name">${res.data.username} : </a><span class="my-pl-con">${Content}</span></div><div class="date-dz"> <span class="date-dz-left pull-left comment-time">${now}</span> <div class="date-dz-right pull-right comment-pl-block"> <a href="javascript:;" class="removeBlock" data-id="${res.data.insertId}">删除</a> <a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" data-id="${res.data.insertId}" data-pid="${id}">回复</a> <span class="pull-left date-dz-line">|</span> <a href="javascript:;" class="date-dz-z pull-left" data-id="${res.data.insertId}"><i class="date-dz-z-click-red"></i>赞 (<i class="z-num">0</i>)</a> </div> </div></div>`;

                    oThis.parents('.hf-con').parents('.comment-show-con-list').find('.hf-list-con').css('display','block').prepend(oHtml) && oThis.parents('.hf-con').siblings('.date-dz-right').find('.pl-hf').addClass('hf-con-block') && oThis.parents('.hf-con').remove();
                }
                alert(res.msg)
            },
            fail: function () {
                alert('回复失败')
            },
            error: function (error) {
                alert(error.responseJSON.msg)
            }
        })
    }
});
// 删除评论块
$('.commentAll').on('click','.removeBlock',function(){
    const that = $(this);
    $.ajax({
        url: "/community/delete/"+that.attr('data-id'),
        type: 'DELETE',
        headers:{
            'Authorization':'Bearer '+sessionStorage.getItem('webToken')
        },
        cache: false,
        success: function (res) {
            if(res.code==1){
                var oT = that.parents('.date-dz-right').parents('.date-dz').parents('.all-pl-con');
                if(oT.siblings('.all-pl-con').length >= 1){
                    oT.remove();
                }else {
                    that.parents('.date-dz-right').parents('.date-dz').parents('.all-pl-con').parents('.hf-list-con').css('display','none')
                    oT.remove();
                }
                that.parents('.date-dz-right').parents('.date-dz').parents('.comment-show-con-list').parents('.comment-show-con').remove();
            }
            alert(res.msg)
        },
        fail: function () {
            alert('删除失败')
        },
        error: function (error) {
            alert(error.responseJSON.msg)
        }
    })
})
// 点赞
$('.comment-show').on('click','.date-dz-z',function(){
    const that = $(this);
    console.log(that)
    $.ajax({
        url: "community/praise/"+that.attr('data-id'),
        type: 'POST',
        headers:{
            'Authorization':'Bearer '+sessionStorage.getItem('webToken')
        },
        cache: false,
        success: function (res) {
            if(res.code==1){
                var zNum = that.find('.z-num').html();
                if(that.is('.date-dz-z-click')){
                    zNum--;
                    that.removeClass('date-dz-z-click red');
                    that.find('.z-num').html(zNum);
                    that.find('.date-dz-z-click-red').removeClass('red');
                }else {
                    zNum++;
                    that.addClass('date-dz-z-click');
                    that.find('.z-num').html(zNum);
                    that.find('.date-dz-z-click-red').addClass('red');
                }
            }
            alert(res.msg)
        },
        fail: function () {
            alert('点赞失败')
        },
        error: function (error) {
            alert(error.responseJSON.msg)
        }
    })
})