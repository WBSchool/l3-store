import html from './search.tpl.html';
import { Component } from '../component';
import { View } from '../../utils/view';
import { ViewTemplate } from '../../utils/viewTemplate';

class SearchPage extends Component {
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

export const searchComp = new SearchPage(html);
