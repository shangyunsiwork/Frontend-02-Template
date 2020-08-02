const images = require('images');

module.exports = function render(viewpoint, element){
  if(element.style){
    let img = images(element.style.width,element.style.height);
    if(element.style['background-color']){
      let color = element.style['background-color'] || 'rgb(0,0,0,0)';
      color.match(/rgb\((\d+),(\d+),(\d+)\)/)
      img.fill(Number(RegExp.$1),Number(RegExp.$2),Number(RegExp.$3));
      viewpoint.draw(img, element.style.left || 0, element.style.top || 0);
    }
  }
  if(element.children){
    for(let child of element.children){
      render(viewpoint, child);
    }
  }
}