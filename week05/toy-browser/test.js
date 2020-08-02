function specificity(selector){
  let p = [0,0,0,0];
  let selectorParts = selector.split(' ');

  const combine = (part) => {
    if(part.charAt(0) === '#'){
      p[1] += 1;
    } else if(part.charAt(0) === '.'){
      p[2] += 1;
    } else {
      p[3] += 1;
    }
  }
  for(let part of selectorParts){
    const match = part.match(/[\#\.]*[a-z0-9A-Z]+/g);
    for(let item of match){
      combine(item);
    }
  }
  return p;
}
console.log(specificity('div div#id.cla'));