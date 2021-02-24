var http = require('http');
var fs = require('fs');
var url = require('url');
// 创建服务器
http.createServer( function (request, response) { 
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
   var urlContent = pathname.substr(1);
   if(urlContent.lastIndexOf("png") > -1){
       if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{            
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'image/png'});
        var imageFilePath = pathname.substr(1);
        var stream = fs.createReadStream( imageFilePath );

				        //读取文件发生错误事件
				stream.on('error', (err) => {
				    console.log('发生异常:', err);
				});



        var responseData = [];//存储文件流
        if (stream) {//判断状态
            stream.on( 'data', function( chunk ) {
              responseData.push( chunk );
            });
            stream.on( 'end', function() {
               var finalData = Buffer.concat( responseData );
               response.write( finalData );
               response.end();
            });
        }             
      }
   }
   else  if(urlContent.lastIndexOf("jpg") > -1){
       if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{            
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'image/jpg'});
        var imageFilePath = pathname.substr(1);
        var stream = fs.createReadStream( imageFilePath );

                //读取文件发生错误事件
        stream.on('error', (err) => {
            console.log('发生异常:', err);
        });



        var responseData = [];//存储文件流
        if (stream) {//判断状态
            stream.on( 'data', function( chunk ) {
              responseData.push( chunk );
            });
            stream.on( 'end', function() {
               var finalData = Buffer.concat( responseData );
               response.write( finalData );
               response.end();
            });
        }             
      }
   }

   else if(urlContent.lastIndexOf("html") > -1){
　　   if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{            
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});           
         // 响应文件内容
         response.write(data.toString());       
      }
      //  发送响应数据
      response.end();
   }

   else if(urlContent.lastIndexOf("topojson") > -1){
　　   if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'application/json'});
      }else{            
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'application/json'});           
         // 响应文件内容
         response.write(data.toString());       
      }
      //  发送响应数据
      response.end();
   }
   else if (urlContent.lastIndexOf("mp4") > -1){

   	if(err){
   		console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain

         response.writeHead(404, {'Content-Type': 'video/mp4'});

   	}else{

   		response.writeHead(200, {'Content-Type': 'video/mp4'});  
   		  var imageFilePath = pathname.substr(1);
          var rs = fs.createReadStream(imageFilePath);  
          
				        //读取文件发生错误事件
				rs.on('error', (err) => {
				    console.log('video发生异常:', err);
				});

          rs.pipe(response);  
          
          rs.on('end',function(){  
            // response.end();  
            console.log('end call');  
          });  
   	}

   	
   }


   else{


    if(err){
      console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain

         response.writeHead(404, {'Content-Type': 'video/mp4'});

    }else{

      response.writeHead(200, {'Content-Type': 'application/octet-stream'});  
        var imageFilePath = pathname.substr(1);
          var rs = fs.createReadStream(imageFilePath);  
          
                //读取文件发生错误事件
        rs.on('error', (err) => {
            console.log('stream 发生异常:', err);
        });

          rs.pipe(response);  
          
          rs.on('end',function(){  
            // response.end();  
            console.log('end call');  
          });  
    }




     console.log("unSupport Type, Please contact Administrator err url="+urlContent); 
   }    
   });  
}).listen(8888);