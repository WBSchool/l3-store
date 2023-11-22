import html from './searchHint.tpl.html';
import { View } from '../../utils/view';
import { ViewTemplate } from '../../utils/viewTemplate';

export class SearchHint {
    view: View;
    routeURL: string;
    hintText: string;
  
    constructor (hintText: string, routeURL: string) {
      this.view = new ViewTemplate(html).cloneView();
      this.hintText = hintText;
      this.routeURL = routeURL;
    }
  
    attach($root: HTMLElement) {
      $root.appendChild(this.view.root);
    }
  
    render () {
      this.view.hintText.setAttribute('href', this.routeURL);
      this.view.hintText.innerText = this.hintText;
    }
}