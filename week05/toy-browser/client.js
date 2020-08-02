const Request = require('./utils/Request');
const parser = require('./utils/HTMLParser');
const render = require('./utils/Image');
const images = require('images');

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
  let dom = parser.parseHTML(res.body);
  let viewpoint = images(800, 600);
  render(viewpoint, dom);
  viewpoint.save('test.jpg');
  console.log(JSON.stringify(dom, null , '   '))
}();