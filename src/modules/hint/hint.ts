import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './hint.tpl.html';
import { ProductData } from 'types';

export class Hint {
  view: View;
  product: ProductData;

  constructor(product: ProductData) {
    this.product = product;
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  render() {
    const { id, name } = this.product;
    this.view.root.setAttribute('href', `/product?id=${id}`);

    const shortName = name.split(' ').slice(0, 2).join(' ');
    this.view.hintContent.textContent = shortName;
  }
}
