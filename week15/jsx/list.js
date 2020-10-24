
import { Component, createElement, ATTRIBUTE} from './framework';

export default class List extends Component{
  constructor(){
    super();
  }

  render(){
    this.children = this[ATTRIBUTE].data.map(this.template);
    console.log(this[ATTRIBUTE].data, this.children, JSON.stringify(this.template));
    this.root = (<div>{this.children}</div>).render();
    return this.root;
  }

  appendChild(child){
    console.log(child);
    this.template = (child);
    // console.log(this.template);
    // this.render();
  }
}