let http = require('http');
let fs = require('fs');
let archiver = require('archiver');
let child_process = require('child_process');
let querystring = require('querystring');
// 1. 
child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.c92f1e2b7f45183a`)

// let request = http.request({
//   hostname: '127.0.0.1',
//   port: '8082',
//   method:'POST',
//   headers: {
//     'Content-Type': 'application/octet-stream',
//   }
// }, response => {
//   console.log(response);
// })

// // let file = fs.createReadStream('./sample.html');

// const archive = archiver('zip', {
//   zlib: { level: 9 } // Sets the compression level.
// });

// archive.directory('./sample/', false);

// archive.pipe(request); 

// archive.finalize()
// // file.pipe(request);

// // file.on('end', () => {
// //   request.end();
// // })

// // fs.stat('./sample.html', (err, stats)=>{

  
// // })

http.createServer(function(req, res){
  let query = querystring.parse(req.url.match(/^\/\?([\s\S]+)$/)[1]);

  publishToken(query.token)
  console.log(query);
}).listen(8083);

function publishToken(token){
  let request = http.request({
    hostname: '127.0.0.1',
    port: '8082',
    method:'POST',
    path:'/publish?token='+token,
    headers: {
      'Content-Type': 'application/octet-stream',
    }
  }, response => {
    console.log(response);
  })

  // let file = fs.createReadStream('./sample.html');

  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  });

  archive.directory('./sample/', false);

  archive.pipe(request); 

  archive.finalize()
}