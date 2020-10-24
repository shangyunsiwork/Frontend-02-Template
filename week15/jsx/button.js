
import { Component, createElement } from './framework';

export default class Button extends Component{
  constructor(){
    super();
  }

  render(){
    this.childrenContainer = <span />;
    this.root = (<div>{this.childrenContainer}</div>).render();
    return this.root;
  }

  appendChild(child){
    if(!this.childrenContainer){
      this.render();
    }
    this.childrenContainer.appendChild(child)
  }
}