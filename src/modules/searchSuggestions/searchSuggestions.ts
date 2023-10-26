import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchSuggestions.tpl.html';
import { Component } from '../component';

class SearchSuggestions extends Component  {
    view: View;
  
    constructor(props: any) {
      super(props);
      this.view = new ViewTemplate(html).cloneView();
    }
  
    attach($root: HTMLElement) {
      $root.innerHTML = '';
      $root.appendChild(this.view.root);
    }
}

export default new SearchSuggestions(html);