
import { Component, ATTRIBUTE , STATE } from './framework';
import { enableGesture } from './gesture';
import { Timeline,Animation } from './animation';
import { linear }  from './ease';

export { ATTRIBUTE , STATE } from './framework';

export class Carosual extends Component{
  render(){
    this.root = document.createElement('div');
    this.root.classList.add('carousal');

    for(let attr of this[ATTRIBUTE].src){
      let child = document.createElement('div');
      child.style.backgroundImage = `url(${attr})`;
      
      this.root.appendChild(child)
    }

    enableGesture(this.root);

    let timeline = new Timeline;

    timeline.start();

    let t = Date.now();
    let ax = 0;
    let handler = null;

    this[STATE].position = 0;
    let children = this.root.children;

    let nextPicture = () => {
      let children = this.root.children;
      let nextIndex = (this[STATE].position + 1) % children.length;
      
      let current = children[this[STATE].position];
      let next = children[nextIndex];
      
      t = Date.now();

      timeline.add(new Animation(current.style, 'transform', - 500 * this[STATE].position, - 500 - nextIndex * 500,
        500, 0, linear, v => `translateX(${v}px)`))
      timeline.add(new Animation(next.style, 'transform', 500 - 500 * this[STATE].position, - nextIndex * 500, 
        500, 0, linear,  v => `translateX(${v}px)`))
      
        this[STATE].position = nextIndex;
        this.triggerEvent('change', { position: this[STATE].position })
    }

    this.root.addEventListener('start', event =>{
      timeline.pause();
      clearInterval(handler);
      if(Date.now() - t < 3000){
        let process = (Date.now() - t) / 3000;
        ax = linear(process) * 500 - 500;
      } else {
        ax = 0;
      }
    })

    this.root.addEventListener('tap', () => {
      this.triggerEvent('click', {
        position: this[STATE].position,
        data: this[ATTRIBUTE].src[this[STATE].position]
      })
    })

    this.root.addEventListener('pan', event=>{
      let x = event.clientX - event.startX - ax; // 100 - 0 = 100
      let current = this[STATE].position - ((x - x % 500) / 500); // ((100 - 100 % 500) / 500) = 0
      for(let offset of [-1, 0, 1]){
        let pos = current + offset; // 0  -1, 0, 1
        pos = (pos % children.length + children.length) % children.length; // -1 + 4 % 4 = 3 0 1

        children[pos].style.transition = 'none'; 
        children[pos].style.transform = `translateX(${- pos * 500 + offset * 500 + x % 500}px)`; 
      }
    })

    this.root.addEventListener('end', event => {
      timeline.reset();
      timeline.start();

      handler = setInterval(nextPicture, 3000);

      let x = event.clientX - event.startX - ax ; // 100 - 0 = 100
      let current =   - ((x - x % 500) / 500); // ((100 - 100 % 500) / 500) = 0

      let direction = Math.round((x % 500) / 500);
      if(event.isFlick){
        if(event.velocity < 0){
          direction = Math.ceil((x % 500) / 500);
        } else {
          direction = Math.floor((x % 500) / 500);
        }
      } 

      for(let offset of [-1, 0, 1]){
        let pos = current + offset; // 0  -1, 0, 1
        pos = (pos % children.length + children.length) % children.length; // -1 + 4 % 4 = 3 0 1

        children[pos].style.transition = 'none'; 
        timeline.add(new Animation(children[pos].style, 'transform',
          - 500 * pos + offset * 500 + x % 500, 
          - 500 * pos + offset * 500 + direction % 500,
          500, 0, linear, v => `translateX(${v}px)`))
      }

      this[STATE].position = this[STATE].position - ((x - x % 500) / 500) - direction;
      this[STATE].position = (this[STATE].position % children.length + children.length) % children.length; // -1 + 4 % 4 = 3 0 1
      this.triggerEvent('change', { position: this[STATE].position })
    })

    handler = setInterval(nextPicture, 3000);
    return this.root;
  }
}