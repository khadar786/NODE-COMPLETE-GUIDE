const fs=require('fs');

const requestHandler = (req,res) => {
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
};

//module.exports = requestHandler;
/* module.exports ={
  handler:requestHandler,
  sometext:"some hard code"
} */

//module.exports.handler=requestHandler;
//module.exports.sometext="some hard code";

exports.handler=requestHandler;
exports.sometext="some hard code";


