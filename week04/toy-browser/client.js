const Request = require('./utils/Request');
const parser = require('./utils/HTMLParser');
void async function(){
  let request = new Request({
    method:'POST',
    host:'127.0.0.1',
    port:'6666',
    path:'/',
    headers:{
      'x-test':'custom'
    },
    body:{
      name:'ssy'
    }
  });
  let res = await request.send();
  console.log('========')
  let dom = parser.parseHTML(res.body);
  console.log(dom)
}();