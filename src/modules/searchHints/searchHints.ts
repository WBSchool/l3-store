import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchHints.tpl.html';
import { ProductData } from 'types';
import { Hint } from '../hint/hint';

export class SearchHints {
  view: View;
  products: ProductData[];

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';

    const firstThreeValues = this.products.slice(0, 3);

    firstThreeValues.forEach((product, index) => {
      const hintComp = new Hint(product);

      // Создаем текст для вставки
      const textToInsert = index === 0 ? 'Например,' : index === 2 ? 'или' : ',';

      // Вставляем текст в корневой элемент
      this.view.root.insertAdjacentHTML('beforeend', textToInsert);

      // Рендерим и добавляем компонент Hint
      hintComp.render();
      hintComp.attach(this.view.root);
    });
  }
}
