$(function () {
    //验证变量
    var flag=false;
    //返回顶部
    $('#xiangshang').hide();
    $(window).scroll(function() {
        if($(document).scrollTop()>0)
        {
            $('#xiangshang').show();
        }else
        {
            $('#xiangshang').hide();
        }
    });
    $('#xiangshang').click(function () {
        $("html, body").animate({
            "scroll-top":0
        },"fast");
    });
    //登录
    $('#login').click(function () {
        showModalOpen('#loginModal');
    });
    //注册
    $('#register').click(function () {
        showModalOpen('#registerModal');
    });
    
    //用户名验证
    $('#uname1').keyup(function(){
    	$(this).parent().nextAll().remove();
    	var reg = /^[A-Za-z]+/; // 判断输入的是不是以字母开头
    	if(!reg.test($(this).val())){
            flag=false;
            addDisabled('#register1')
    		$(this).parent().after('<div class="alert alert-danger help-block">用户名必须以英文字母开始</div>');
        }
        if($(this).val().length<5){
            flag=false;
            addDisabled('#register1')
    		$(this).parent().after('<div class="alert alert-danger help-block">用户名长度不能小于5位</div>');
        }
        if($(this).val().length>10){
            flag=false;
            addDisabled('#register1')
        	$(this).parent().after('<div class="alert alert-danger help-block">用户名长度不能超过10位</div>');
        }else{
        	flag=true;
        }
    });
    //密码验证
    $('#upass1').keyup(function(){
    	$(this).parent().nextAll().remove();
        if($(this).val().length<5){
            flag=false;
            addDisabled('#register1')
    		$(this).parent().after('<div class="alert alert-danger help-block">密码长度不能小于5位</div>');
        }
        if($(this).val().length>10){
            flag=false;
            addDisabled('#register1')
        	$(this).parent().after('<div class="alert alert-danger help-block">密码长度不能超过10位</div>');
        }else{
            flag=true;
        }
    });
    function addDisabled(el){
        $(el).attr('disabled',true)
    }
    //确认密码验证
    $('#passConfirm').keyup(function(){
    	$(this).parent().nextAll().remove();
        if($(this).val()!=$('#upass1').val()){
            flag=false;
            addDisabled('#register1')
    		$(this).parent().after('<div class="alert alert-danger help-block">密码和确认密码不一致</div>');
        }else{
        	flag=true;
        }
    });
    //邮箱验证
    $('#email').keyup(function(){
    	$(this).parent().nextAll().remove();
    	var reg =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if(!reg.test($('#email').val())){
            flag=false;
            addDisabled('#register1')
    		$(this).parent().after('<div class="alert alert-danger help-block">邮箱格式不正确</div>');
        }else{
        	flag=true;
        }
        if(flag){
    		$('#register1').removeAttr("disabled");
    	}
    });
    //点击注册按钮
    $('#register1').click(function () {
        var username=$('#uname1').val();
        var password=$('#upass1').val();
        var passConfirm=$('#passConfirm').val();
        var email=$('#email').val();
    	if(username&&password&&email){
            if(password!=passConfirm){
                showTips('用户注册','密码和确认密码不一致！！')
                return;
            }
            $.ajax({
                url: "/register",
                type: 'POST',
                data:{
                    username,
                    password,
                    email
                },
                cache: false,
                success: function (res) {
                    if(res.flag){
                        showModalHide('#registerModal');
                        location.replace(location)
                    }
                    showTips('用户注册',res.msg)
                },
                fail: function (res) {
                    showTips('用户注册',res.msg)
                },
                error: function (error) {
                    showTips('用户评论',error.responseJSON.msg)
                }
            })
        }else{
            showTips('用户注册','请填写好信息！！')
        }
    });
    //密码验证
    $('#upass').keyup(function(){
    	if($('#uname').val()!=null&&$('#upass').val()!=null){
    		$('#login1').removeAttr("disabled");
    	}else{
            addDisabled('#login1')
        }
    });
    //点击登陆按钮
    $('#login1').click(function () {
        var username=$('#uname').val();
        var password=$('#upass').val();
        if(username&&password){
            $.ajax({
				url: "/admin/login",
                type: 'POST',
                data:{
                    username,
                    password,
                    isAdmin: 0
                },
				cache: false,
				success: function (res) {
                    if(res.code==1){
                        sessionStorage.setItem('webToken',res.data.token)
                        showModalHide('#loginModal');
                        location.replace(location)
                    }else{
                        showTips('用户登录',res.msg)
                    }
                },
                fail: function (res) {
                    showTips('用户登录',res.msg)
                },
                error: function (error) {
                    showTips('用户评论',error.responseJSON.msg)
                }
            })
        }else{
            showTips('用户登录','请填写好信息！！')
        }
    });
    // 公用方法
    function showTips(title, msg) {
        var el='#myModalCommon'
        showModalOpen(el);
        $(el+' .modal-title').text(title);
        $(el+' .modal-body').text(msg);
        //2秒后消失提示框
        setTimeout(
            function () {
                showModalHide(el);
            }, 2000
        );
    }
    function showTips2(el,title, body,footer) {
        showModalOpen(el);
        $(el+' .modal-title').text(title);
        $(el+' .modal-body').html(body);
        $(el+' .modal-body').nextAll().remove();
        $(el+' .modal-body').after(footer);
    }
    // 评论
    $("#comment .sendComment").click(function(){
        var that=$(this);
        // 评论的文字
        var comment=that.parent().prev().val();
        if(comment.length==0){
            showTips('用户评论', '请填写评论哟~')
        }else{
            var id=getQueryString("id");
            $.ajax({
				url: "/comment",
                type: 'POST',
                data:{
                    comment,
                    id
                },
                headers:{
                    'Authorization':'Bearer '+sessionStorage.getItem('webToken')||''
                },
				cache: false,
				success: function (res) {
                    // code："no-login" 用户没登陆    "success" 成功
                    if(res.code==1){
                        var data=res.data;
                        var str=''
                        for(var i=0;i<data.length;i++){
                            var item=data[i]
                            str+=`<div class="media">
                                <div class="media-left">
                                    <img class="media-object" alt="${item.Username}" src="${item.Avatar}" style="width: 64px; height: 64px;">
                                </div>
                                <div class="media-body">
                                    <h4 class="media-heading">${item.Username}</h4>
                                    <p>${item.Content}</p>
                                    <div class="text-right">发表于：${item.UpdateTime}</div>
                                </div>
                            </div>`
                            if (data.length-1!=i){
                                str+="<hr/>"
                            }
                        }
                        // 先清空原有数据
                        that.parent().nextAll().remove();
                        // 添加新数据
                        that.parent().after(str)
                        showTips('用户评论','评论成功~')
                    }else{
                        showTips('用户评论',res.msg)
                    }
                },
                fail: function () {
                    showTips('用户评论','评论失败')
                },
                error: function (error) {
                    showTips('用户评论',error.responseJSON.msg)
                }
            })
        }
    })
    // 对象字符串转对象
    function stringToObj(str){
        return JSON.parse(str)
    }
    // json数组转对象
    function arrayToJson(array){
        var json={}
        $.each(array, function (index,item) {
            json[item.name]=item.value
        })
        return json
    }
    // 增加
    $(".addQuantity").click(function(){
        // 输入框的内容
        var that=getResult($(this),0)
        // 默认
        var num=getResult($(this),1)
        if(num){
            num=parseInt(num)+1
        }else{
            num=1
        }
        that.val(num);
        $('.totalPrice').text((parseFloat($('.Price').text())*num).toFixed(2))
    })
    // 减少
    $(".reduceQuantity").click(function(){
        // 输入框的内容
        var that=getResult($(this),0)
        // 默认
        var num=getResult($(this),1)
        if(num&&num>0){
            num=parseInt(num)-1
        }else{
            num=0
        }
        that.val(num);
        $('.totalPrice').text((parseFloat($('.Price').text())*num).toFixed(2))
    })
    // 增加和减少的通用方法
    function getResult(that,flag){
        // 输入框的内容
        var el=that.parent();
        // 判断是在购物车页面还是商品详情页面
        if(el.hasClass("form-group")){
            el=el.find('.form-control');
        }else{
            el=el.prev()
        }

        if(flag==0){
            return el;
        }else{
            var num=el.val();
            return num;
        }
    }
    // 搜索的下拉框
    $('.searchName').click(function(){
        $(this).parent().parent().prev('.dropdown-toggle').html($(this).text()+'&nbsp;<span class="caret"></span>')
        $('.searchResult').attr('data-typeId',$(this).attr('data-typeId'))
    })
    // 搜索按钮
    $('.searchResult').click(function(){
        var searchName=$(this).prev('.form-group').find('.form-control').val()
        var typeId=$(this).attr('data-typeId')
        window.location.href=['/search?typeId=',typeId,'&searchName=',encodeURI(searchName)].join('')
    })
    // 单品支付
    $('.alipay').click(function(){
        var Id=getQueryString("id");
        if(Id){
            var quantity=$(this).parent().prevAll().eq(3).find("input[type='text']").val()||0;
            var data={Id:Id,Quantity:quantity}
            $.ajax({
                url: "/orderIsLogin",
                type: 'POST',
                data:data,
                headers:{
                    'Authorization':'Bearer '+sessionStorage.getItem('webToken')
                },
                cache: false,
                success: function (res) {
                    if(res.flag){
                        window.location.href=["/confirmOrderPage?ids=",Id,'&shopcart=',JSON.stringify([data])].join('')
                    }else{
                        showTips('购买',res.msg)
                    }
                },
                fail: function () {
                    showTips('错误','请先登录！')
                },
                error: function (error) {
                    showTips('用户评论',error.responseJSON.msg)
                }
            })
        }else{
            showTips('错误','地址栏参数错误')
        }
    })
    $('.addressOrder').click(function(){
        var len=$('.addressList').children().length
        var body=`<form class="form-horizontal">
        <div class="form-group">
          <label for="name" class="col-sm-2 control-label">收货人</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="name">
          </div>
        </div>
        <div class="form-group">
          <label for="address" class="col-sm-2 control-label">收货地址</label>
          <div class="col-sm-10">
            <textarea class="form-control" rows="3" id="address"/>
          </div>
        </div>
        <div class="form-group">
          <label for="phone" class="col-sm-2 control-label">电话号码</label>
          <div class="col-sm-10">
            <input type="text" onkeypress="return event.keyCode>=48&&event.keyCode<=57" maxlength="11" class="form-control" id="phone">
          </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
            <div class="checkbox">
                <label>
                <input type="checkbox" ${len==0?'checked disabled':''}> 是否为默认地址
                </label>
            </div>
            </div>
        </div>
        </form>`
        var footer=`<div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary saveAddress">保存</button>
        </div>`
        showTips2('#confirmOrder',"选择地址", body,footer)
        // 确认订单的 收货地址
        $("#confirmOrder .saveAddress").click(function(){
            // 保存地址
            var name=$("#confirmOrder").find("input[id='name']").val()
            var address=$("#confirmOrder").find("textarea[id='address']").val()
            var phone=$("#confirmOrder").find("input[id='phone']").val()
            var isDefault=$("#confirmOrder").find("input[type='checkbox']").is(':checked')?'1':'0'
            if(name&&address&&phone){
                // 信息填写完成
                $.ajax({
                    url: "/admin/address",
                    type: 'POST',
                    data: {
                        name:name,
                        address:address,
                        phone:phone,
                        isDefault:isDefault
                    },
                    headers:{
                        'Authorization':'Bearer '+sessionStorage.getItem('webToken')
                    },
                    cache: false,
                    success: function (res) {
                        if(res){
                            showModalHide('#confirmOrder')
                            alert('保存成功~')
                            location.replace(location)
                        }else{
                            alert('地址保存失败')
                        }
                    },
                    fail: function () {
                        alert('地址保存失败')
                    },
                    error: function (error) {
                        showTips('用户评论',error.responseJSON.msg)
                    }
                })
            }else{
                alert('信息请填写完整！')
            }
        })
    })
    // 编辑地址
    $('.addressList .editAddress').click(function(){
        var str=$(this).attr("data-obj")
        var obj=stringToObj(str);
        var body=`<form class="form-horizontal">
        <div class="form-group">
          <label for="name" class="col-sm-2 control-label">收货人</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="name" value="${obj.Name}">
          </div>
        </div>
        <div class="form-group">
          <label for="address" class="col-sm-2 control-label">收货地址</label>
          <div class="col-sm-10">
            <textarea class="form-control" rows="3" id="address">${obj.Address}</textarea>
          </div>
        </div>
        <div class="form-group">
          <label for="phone" class="col-sm-2 control-label">电话号码</label>
          <div class="col-sm-10">
            <input type="text" onkeypress="return event.keyCode>=48&&event.keyCode<=57" maxlength="11" class="form-control" id="phone" value="${obj.Phone}">
          </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
            <div class="checkbox">
                <label>
                <input type="checkbox" ${obj.IsDefault=='1'?'checked':''}> 是否为默认地址
                </label>
            </div>
            </div>
        </div>
        </form>`
        var footer=`<div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button" class="btn btn-primary updateAddress">保存</button>
        </div>`
        showTips2('#confirmOrder',"选择地址", body,footer)
        // 确认订单的 收货地址
        $("#confirmOrder .updateAddress").click(function(){
            // 保存地址
            var Id=obj.Id;
            var name=$("#confirmOrder").find("input[id='name']").val()
            var address=$("#confirmOrder").find("textarea[id='address']").val()
            var phone=$("#confirmOrder").find("input[id='phone']").val()
            var isDefault=$("#confirmOrder").find("input[type='checkbox']").is(':checked')?1:0
            if(name&&address&&phone){
                // 信息填写完成
                $.ajax({
                    url: "/admin/address/"+Id,
                    type: 'PUT',
                    data: {
                        Id:Id,
                        name:name,
                        address:address,
                        phone:phone,
                        isDefault:isDefault
                    },
                    headers:{
                        'Authorization':'Bearer '+sessionStorage.getItem('webToken')
                    },
                    cache: false,
                    success: function (res) {
                        if(res){
                            showModalHide('#confirmOrder')
                            alert('修改成功~')
                            location.replace(location)
                        }else{
                            alert('地址修改失败')
                        }
                    },
                    fail: function () {
                        alert('地址修改失败')
                    },
                    error: function (error) {
                        showTips('用户评论',error.responseJSON.msg)
                    }
                })
            }else{
                alert('信息请填写完整！')
            }
        })
    })
    // 删除地址
    $('.addressList .editAddress').next().click(function(){
        var that=$(this)
        var id=$(this).attr("data-id")
        $.ajax({
            url: "/admin/address/"+id,
            type: 'DELETE',
            headers:{
                'Authorization':'Bearer '+sessionStorage.getItem('webToken')
            },
            cache: false,
            success: function (res) {
                if(res){
                    alert('删除成功')
                    that.parent().parent().remove(); 
                }else{
                    alert('删除失败')
                }
            },
            fail: function () {
                alert('删除失败')
            },
            error: function (error) {
                showTips('用户评论',error.responseJSON.msg)
            }
        })
    })
    // 蚂蚁金服 支付
    $('.paymoney').click(function(){
        const ids=getQueryString('ids');
        const shopcart=getQueryString('shopcart');
        var len=$('.addressList').children().length
        if(len==0){
            alert('请选择地址')
        }else if(ids&&shopcart){
            $.ajax({
                url: "/order/alipay",
                type: 'POST',
                data:{
                    ids,
                    shopcart
                },
                headers:{
                    'Authorization':'Bearer '+sessionStorage.getItem('webToken')
                },
                cache: false,
                success: function (res) {
                    if(res.flag){
                        window.location.href=res.url
                    }else{
                        alert('支付失败')
                    }
                },
                fail: function () {
                    alert('支付失败')
                },
                error: function (error) {
                    showTips('用户评论',error.responseJSON.msg)
                }
            })
        }else{
            alert('地址参数错误')
        }
    })
    // 公用开启和关闭
    function showModalOpen(str){
        $(str).modal('show');
    }
    function showModalHide(str){
        $(str).modal('hide');
    }
    // 获取地址栏的参数
    function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); 
        return null; 
    }
});