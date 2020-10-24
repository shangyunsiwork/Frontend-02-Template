import { createElement } from './framework';
import Button from './button';

let a = <Button>
  123
</Button>
a.mountTo(document.body); 



// document.body.appendChild(a); 