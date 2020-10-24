import { createElement } from './framework';
import List from './list';

let d = [
  {
    url: '//unsplash.it/1920/500/?image=6',
  },
  {
    url: '//unsplash.it/1920/500/?image=7',
  },
  {
    url: '//unsplash.it/1920/500/?image=8',
  },
  {
    url: '//unsplash.it/1920/500/?image=9',
  },
]

let a = <List data = {d}>
  {
    (record)=>
      <div>
        <img src={record.url}/>
      </div>
    
  }
</List>
a.mountTo(document.body); 



// document.body.appendChild(a); 