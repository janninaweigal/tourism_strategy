$(function(){
    // 个人信息
    $('.personInfo .uploadFile').change(function(){
        var that= $(this);
        var file = that.get(0).files[0];
        if(/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)){
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                var result = reader.result
                that.prev('img').attr("src", result);
            }
        }else{
            alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
        }
    })
    // 保存更改
    $('.personInfo .btn-primary').click(function(){
        var that = $(this)
        var avatar=that.parent().find('img').attr('src')
        $.ajax({
            url: "/personal/updateImg",
            type: 'PUT',
            data:{
                avatar
            },
            headers:{
                'Authorization':'Bearer '+sessionStorage.getItem('webToken')
            },
            cache: false,
            success: function (res) {
                if(res.flag){
                    location.replace(location)
                }
                alert(res.msg)
            },
            fail: function () {
                alert('错误,请刷新页面！')
            },
            error: function (error) {
                showTips('保存更改',error.responseJSON.msg)
            }
        })
    })
    
})
function changePwd(){
    $.ajax({
        url: "/changePwd",
        type: 'Post',
        data:{
            oldPwd:$('#oldPwd').val(),
            pass:$('#pass').val(),
            checkPass:$('#checkPass').val()
        },
        headers:{
            'Authorization':'Bearer '+sessionStorage.getItem('webToken')
        },
        cache: false,
        success: function (res) {
            if(res.code==1){
                document.getElementById("changePwdForm").reset();
            }
            alert(res.msg)
        },
        fail: function () {
            alert('错误,请刷新页面！')
        },
        error: function (error) {
            alert(error.responseJSON.msg)
        }
    })
}