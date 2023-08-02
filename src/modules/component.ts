import { ViewTemplate } from '../utils/viewTemplate';
import { View } from '../utils/view';

export class Component {
  view: View;
  data: any;

  constructor(html: any) {
    this.data = {};
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(data: any) {
    this.data = data;
    this.render();
  }

  render() {}
}
