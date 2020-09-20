export function createElement(type, attributes, ...children){
  let element;
  if(typeof type === 'string'){
    element= new ElementWrapper(type);
  } else {
    element = new type;
  }

  for(let attr in attributes){
    element.setAttribute(attr, attributes[attr]);
  }

  for(let child of children){
    if(typeof child === 'string'){
      child = new TextWrapper(child);
    }
    element.appendChild(child);
  }
  return element;
}

export class Component{
  // constructor(){
  //   this.root = this.render();
  // }
  setAttribute(name, value){
    this.root.setAttribute(name, value);
  }

  appendChild (child){
    // this.root.appendChild(child)
    child.mountTo(this.root);
  }

  mountTo(parent){
    parent.appendChild(this.root)
  }
}
export class ElementWrapper extends Component{
  constructor(type){
    this.root = document.createElement(type);
  }

 
}


export class TextWrapper extends Component{
  constructor(content){
    this.root = document.createTextNode(content);
  }
}
