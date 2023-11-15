import { Component } from '../component';
import html from './search.tpl.html';
import { Hints } from '../hints/hints';

class Search extends Component {
  hints!: Hints;
  
  constructor(props: any) {
    super(props);
    this.hints = new Hints();
    this.hints.attach(this.view.hints);
  }
  
  async render() {
    this.hints.render();
  }
}
  
export const searchComp = new Search(html);