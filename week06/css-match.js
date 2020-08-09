function matchElement(selector, element){
  // 读取id
  let id = element.id;
  // 读取tag
  let tagName = element.tagName.toLocaleLowerCase();
  // 读取classlist
  let classList = Array.prototype.slice.apply(element.classList);

  const matchList = selector.match(/[\#\.]?[a-z0-9A-Z]+/g);
  for(let match of matchList){
    if(match.indexOf('#') === 0){
      if(match.slice(1) === id){
        continue;
      }
      return false;
    }

    if(match.indexOf('.') === 0){
      if(classList.includes(match.slice(1))){
        continue;
      }
      return false;
    }

    if(!(match === tagName)){
      return false;
    }
  }
  return true;
}

function match(selector, element) {
  // 拆分select 反转匹配
  let selectorParts = selector.match(/[\#\.]?[a-z0-9A-Z>#\.\+]+/g).reverse();

  for(let i = 0; i < selectorParts.length; i ++){
    const part = selectorParts[i];
    if(part.indexOf('>') !== -1){
      let [parent, child] = part.split('>');
      const childMatch = matchElement(child, element);
      if(!childMatch) return false;

      const parentMatch = matchElement(parent, element.parentElement);

      if(!parentMatch) return false;

      element = element.parentElement;
    } else if(part.indexOf('+') !== -1){
      let [parent, child] = part.split('+');
      const childMatch = matchElement(child, element);
      if(!childMatch) return false;

      const parentMatch = matchElement(parent, element.previousElementSibling);

      if(!parentMatch) return false;

      element = element.parentElement;
    } else {
      const childMatch = matchElement(part, element);
      if(!childMatch) return false;

      element = element.parentElement;
    }
  }
  return true;
}

let success;
success = match("div div>#id.cla", document.getElementById("id"));
console.log(success);
success = match("div div+#id.cla", document.getElementById("id"));
console.log(success);



// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
// </head>
// <body>
//   <div>
//     <div>12312</div>
//     <div id='id' class='cla'>12312</div>
//   </div>

//   <script src='./css-match.js'></script>
// </body>
// </html>