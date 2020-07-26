const http = require('http');
const fs = require('fs');
http.createServer((req,res)=>{
  let body = [];
  req.on('error',(err)=>{
    console.log(err)
  }).on('data',(chunk)=>{
    body.push(chunk);
  }).on('end',async ()=>{
    let buffer = Buffer.concat(body).toString();
    res.writeHead(200,{'Content-Type':'text/html'});
    const html = await fs.readFileSync('./index.html',{encoding:'utf-8'});
    res.end(html.toString());
  })
}).listen(6666);
console.log('server start');