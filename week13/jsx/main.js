import { createElement } from './framework';
import { Carosual } from './carousel';
import { Timeline, Animation } from './animation';
let d = [
  '//unsplash.it/1920/500/?image=6',
  '//unsplash.it/1920/500/?image=7',
  '//unsplash.it/1920/500/?image=8',
  '//unsplash.it/1920/500/?image=9',
]

let a = <Carosual src={d}/>

a.mountTo(document.body); 



// document.body.appendChild(a); 