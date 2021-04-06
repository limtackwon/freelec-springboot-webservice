var main = {
    init : function () {
        var _this = this;
        $('#btn-save').on('click', function () {
            _this.save();
        });

        $('#btn-update').on('click', function () {
            _this.update();
        });

        $('#btn-delete').on('click', function () {
            _this.delete();
        });

        $(".btn.btn-secondary.active").on("click",function(){
            alert("네이버 로그인을 이용하려면 메일을 보내주세요");
            $(".btn.btn-secondary.active").html("ltw20140917@gmail.com");
        });

        _this.pageLoad();

    },
    save : function () {
        var data = {
            title: $('#title').val(),
            author: $('#author').val(),
            content: $('#content').val()
        };

        $.ajax({
            type: 'POST',
            url: '/api/v1/posts',
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('글이 등록되었습니다.');
            window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },
    update : function () {
        var data = {
            title: $('#title').val(),
            content: $('#content').val()
        };

        var id = $('#id').val();

        $.ajax({
            type: 'PUT',
            url: '/api/v1/posts/'+id,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('글이 수정되었습니다.');
            window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },
    delete : function () {
        var id = $('#id').val();

        $.ajax({
            type: 'DELETE',
            url: '/api/v1/posts/'+id,
            dataType: 'json',
            contentType:'application/json; charset=utf-8'
        }).done(function() {
            alert('글이 삭제되었습니다.');
            window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    }
    ,pageLoad : function (){
        //네아로 설정
        $(".btn.btn-secondary.active").attr("href","");

        var filter = "chrome|safari";
        var result = "";
        if(navigator.userAgent.toLowerCase()){
            if(navigator.userAgent.toLowerCase().indexOf("chrome")>0||navigator.userAgent.toLowerCase().indexOf("safari")>0){
                result = "OK";
            }
        }
        if("OK"!==result){
            $(".btn.btn-success.active").attr("href","");
            $(".btn.btn-success.active").on("click",function(){
               alert("크롬 또는 사파리 브라우저를 사용하세요");
            });
        }
    }

};

main.init();