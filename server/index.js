var http = require('http');
var url = require('url');
// 127.0.0.1
http.createServer(function (request, response) {
    var pathName= url.parse(request.url).pathname;
    var query = url.parse(request.url, true).query;
    if (pathName == '/data') {
        var data = require('./data.json');
        var size = 10;
        var page = query.page;
        // page = 2的时候  数据索引值 10 - 19 
        //        3                  20 - 29
        var resultData = data.filter(function (item, index) {
            return index >= ( page - 1 ) * size && index < page * size;
        });
        response.writeHead(200, {
            // 响应头数据
            // 允许跨域的域  * 代表所有域
            "Access-Control-Allow-Origin": '*',
            "Content-Type": "application/json"
        });
        response.write(JSON.stringify(resultData));
        response.end();
    }
}).listen(3000)