layui.use(['form', 'element', 'util', 'carousel', 'laypage', 'layer','table'], function () {
    var table = layui.table;
    table.render({
        elem: '#adminlist'
        , url: basePath+'/admin/userlist' + '/2' + '/1'
        , page: {
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip']
            , groups: 3
            , limits: [10, 20, 50]
            , limit: 10
        }, cols: [[
            {field: 'uimage', title: 'Avatar', templet: '<div><img src="{{d.uimage}}" class="layui-nav-img"></div>',width:120,align:'center'}
            , {field: 'username', title: 'Nickname', width: 200, align:'center'}
            , {field: 'mobilephone', title: 'PhoneNum', width: 200, align:'center'}
            , {field: 'email', title: 'Email', width: 300, align:'center'}
            , {field: 'sex', title: 'Sex', width: 150, align:'center'}
            /*
            , {field: 'school', title: '学校', width: 200, align:'center'}
            , {field: 'faculty', title: '院系', width: 160, align:'center'}
            , {field: 'roleid', title: '身份', width: 100, align:'center'}*/
            , {fixed: 'right', title: 'OP', toolbar: '#barDemo', width:320, align:'center'}
        ]], done: function (res, curr, count) {
            $("[data-field='roleid']").children().each(function () {
                if($(this).text() == '身份') {
                    $(this).text("身份")
                }else if($(this).text()==1){
                    $(this).text("普通用户")
                }else if($(this).text()==2){
                    $(this).text("管理员")
                }
            });
        }
        ,height: 500
    });
    //监听行工具事件
    table.on('tool(test)', function (obj) {
        var data = obj.data;
        if (obj.event === 'gerenzhuye') {
            //window.open(basePath+"/product-detail/"+data.commid)
        }else if(obj.event === 'setuser'){
            layer.confirm('Are you sure to set the administrator as a user？', {
                btn: ['Yes','Cancel'], //按钮
                title:"Set as User",
                offset:"50px"
            }, function(){
                layer.closeAll();
                $.ajax({
                    url: basePath+'/admin/set/administrator/'+data.userid+"/1",
                    data: "",
                    contentType: "application/json;charset=UTF-8", //发送数据的格式
                    type: "put",
                    dataType: "json", //回调
                    beforeSend: function () {
                        layer.load(1, { //icon支持传入0-2
                            content: 'Loading...',
                            success: function (layero) {
                                layero.find('.layui-layer-content').css({
                                    'padding-top': '39px',
                                    'width': '60px'
                                });
                            }
                        });
                    },
                    complete: function () {
                        layer.closeAll('loading');
                    },
                    success: function (data) {
                        console.log(data)
                        if(data.status===200){
                            layer.msg("Set successfully!", {
                                time: 1000,
                                icon: 1,
                                offset: '50px'
                            }, function () {
                                location.reload();
                            });
                        }else {
                            layer.msg("Failed!", {
                                time: 1000,
                                icon: 2,
                                offset: '50px'
                            });
                        }
                    }
                });
            }, function(){
            });
        }
    });
});