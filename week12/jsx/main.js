import { Component, createElement } from './framework';

class Carosual extends Component{
  constructor(){
    // this.root = document.createElement('div');
    super();

    this.attributes = Object.create(null);
  }

  setAttribute(name, value){
    this.attributes[name] = value;
  }

  mountTo(parent){
    parent.appendChild(this.render());
  }

  render(){
    this.root = document.createElement('div');
    this.root.classList.add('carousal');

    for(let attr of this.attributes.src){
      let child = document.createElement('div');
      child.style.backgroundImage = `url(${attr})`;
      
      this.root.appendChild(child)
    }

    let position = 0;
    this.root.addEventListener('mousedown', (event) =>{
      let children = this.root.children;
      let startX = event.clientX;
      let move = event => {
        let x = event.clientX - startX; // 100 - 0 = 100
        let current = position - ((x - x % 500) / 500); // ((100 - 100 % 500) / 500) = 0
        for(let offset of [-1, 0, 1]){
          let pos = current + offset; // 0  -1, 0, 1
          pos = (pos + children.length) % children.length; // -1 + 4 % 4 = 3 0 1

          children[pos].style.transition = 'none'; 
          children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`; 
        }
      }

      let up = event => {
        let x = event.clientX - startX;
        position = position - Math.round(x / 500);  // 0
        //                    -1            0 - 100  + 250 * 1
        for(let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]){
          let pos = position + offset; // -1
          pos = (pos + children.length) % children.length; // 3

          console.log(pos);
          children[pos].style.transition = 'none';
          children[pos].style.transform = `translateX(${- pos * 500 + offset * 500}px)`; // -2000
        }
        document.removeEventListener('mouseup', up)
        document.removeEventListener('mousemove', move)
      }

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    })
    // let currentIndex = 0;
    // setInterval(() => {
    //   let children = this.root.children;
    //   let nextIndex = (currentIndex + 1) % children.length;
      
    //   let current = children[currentIndex];
    //   let next = children[nextIndex];

    //   next.style.transition = 'none';
    //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`;


    //   setTimeout(() => {
    //     next.style.transition = '';
    //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;  
    //     next.style.transform = `translateX(${- nextIndex * 100}%)`;  
    //     currentIndex = nextIndex;
    //   }, 16);
    // }, 3000);
    return this.root;
  }
}

let d = [
  '//unsplash.it/1920/500/?image=6',
  '//unsplash.it/1920/500/?image=7',
  '//unsplash.it/1920/500/?image=8',
  '//unsplash.it/1920/500/?image=9',
]

let a = <Carosual src={d}/>

a.mountTo(document.body);
// document.body.appendChild(a);