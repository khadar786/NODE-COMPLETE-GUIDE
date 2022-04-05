const http=require('http');
const fs=require('fs');

const server=http.createServer((req,res)=>{
  //console.log(req);
  //process.exit();
  //console.log(req.url,req.method,req.headers)
  const url=req.url;
  const method=req.method;

  if(url==='/'){
    res.write('<html>');
    res.write('<head><title>My first app</title></head>');
    res.write('<body><form method="POST" action="/message"><input type="text" name="message"/><button type="submit">Submit</button></form></body>');
    res.write('</html>');
    return res.end();
  }

  if(url==='/message' && method==='POST'){
    const body=[];
    req.on('data',(chunk)=>{
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end',()=>{
      const parseBody=Buffer.concat(body).toString();
      console.log(parseBody);
      const message=parseBody.split('=')[1];
      fs.writeFile('msg.txt',message,err=>{
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
      });
      
    });  
    
  }

  res.setHeader('Content-Type','text/html');
  res.write('<html>');
  res.write('<header><title>Hello World</title></header>');
  res.write('<body>');
  res.write('<h1>Hello world from NODE JS Server</h1>');
  res.write('</body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);