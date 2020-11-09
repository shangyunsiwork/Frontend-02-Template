let http = require('http');
let https = require('https');
let fs = require('fs');
let unzipper = require('unzipper');
let querystring = require('querystring');
const { callbackify } = require('util');
const { userInfo } = require('os');

function auth(req,res){
  let query = querystring.parse(req.url.match(/^\/auth\?([\s\S]+)$/)[1]);
  getToken(query.code, (info) => {
    res.write(`<a href='http://localhost:8083/?token=${info.access_token}'>publish</a>`);
    res.end();
  })
}

function getToken(code, callback){
  let request = https.request({
    hostname:'github.com',
    path:`/login/oauth/access_token?code=${code}&client_id=Iv1.c92f1e2b7f45183a&client_secret=510a9ac34842e694408d3de72a502f851ba5ab78`,
    port: 443,
    method: 'POST'
  },(res)=>{
    let body = '';
    res.on('data', chunk => {
      body += chunk.toString();
    })
    res.on('end', () => {
      let o = querystring.parse(body);
      callback(o);
    })
  });
  request.end()
}

function getUser(token, callback) {
  let request = https.request({
    hostname:'api.github.com',
    path:`/user`,
    port: 443,
    method: 'GET',
    headers:{
      'Authorization': `token ${token}`,
      'User-Agent': 'ssy-toy-publish'
    }
  },(res)=>{
    let body = '';
    res.on('data', chunk => {
      body += chunk.toString();
    })
    res.on('end', () => {
      callback(JSON.parse(body));
    })
  });
  request.end()
}

function publish(req,res){
  let query = querystring.parse(req.url.match(/^\/publish\?([\s\S]+)$/)[1]);
  if(!query.token){
    return;
  }

  getUser(query.token, (user) => {
    if(user.login === 'shangyunsi'){
      // let outFile = fs.createWriteStream('../server/public/tmp.zip');

      // req.pipe(outFile);
      req.pipe(unzipper.Extract({ path: '../server/public/' }));
      req.on('end',()=>{
        res.end('success');
      })
    }
  })
}

http.createServer(function(req, res){
  if(req.url.match(/^\/auth\?/)){
    return auth(req,res);
  }

  if(req.url.match(/^\/publish\?/)){
    return publish(req,res);
  }
  console.log('request');
  // let outFile = fs.createWriteStream('../server/public/tmp.zip');

  // req.pipe(outFile);
  // req.pipe(unzipper.Extract({ path: '../server/public/' }));
}).listen('8082')