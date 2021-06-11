layui.use(['form', 'element', 'util', 'carousel', 'laypage', 'layer','table'], function () {
    var table = layui.table;
    table.render({
        elem: '#sold'
        , url: basePath+'/soldrecord/lookuser'
        , page: {
            layout: ['limit', 'count', 'prev', 'page', 'next', 'skip']
            , groups: 3
            , limits: [20, 50, 100]
            , limit: 20
        }, cols: [[
            {field: 'id', title: 'The order number',width:180, align:'center'}
            , {field: 'commname', title: 'Title', width: 250, align:'center'}
            , {field: 'commdesc', title: 'Description', width: 250, align:'center'}
            , {field: 'thinkmoney', title: 'Selling price', width: 150, align:'center'}
            , {field: 'soldtime', title: 'Time to sell', width: 260, sort: true, align:'center'}
            , {fixed: 'right', title: 'Operation', toolbar: '#barDemo', width:200, align:'center'}
        ]]
        ,height: 500
    });
    //监听行工具事件
    table.on('tool(test)', function (obj) {
        var data = obj.data;
        if (obj.event === 'xiangqing') {
            window.open(basePath+"/product-detail/"+data.commid)
        }else if(obj.event === 'shanchujilu'){
            layer.confirm('Are you sure you want to delete this record?', {
                btn: ['Yes','No'], //按钮
                title:"Delete the sales record",
                offset:"50px"
            }, function(){
                layer.closeAll();
                $.ajax({
                    url: basePath+'/soldrecord/delect/'+data.id,
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
                            layer.msg(data.message, {
                                time: 1000,
                                icon: 1,
                                offset: '50px'
                            }, function () {
                                location.reload();
                            });
                        }else {
                            layer.msg(data.message, {
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