import html from './search-tips.tpl.html';

import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { Tip } from 'types';

export class SearchTips {
  view: View;
  tips: Tip[];

  constructor() {
    this.tips = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(tips: Tip[]) {
    //Фильтруем подсказки только с заполненными данными
    this.tips = tips.filter(tip => tip.product !== undefined && tip.link !== undefined);
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';
    let firstText = document.createElement('span'); 
    let secondText = document.createElement('span'); 
    let thirdText = document.createElement('span');

    firstText.classList.add('search-tips__text', 'first-text');
    secondText.classList.add('search-tips__text', 'second-text');
    thirdText.classList.add('search-tips__text', 'third-text');
    firstText.innerHTML = 'Например,';
    this.view.root.prepend(firstText);

    this.tips.forEach((tip, index) => {
      let tipBlock = document.createElement('span');
      let product = document.createElement('a');

      //В зависимости от количества подсказок, вставляем текст между ними
      if (index == 1) {
        secondText.innerHTML = ',';
        this.view.root.append(secondText);
      } else if (index == 2) {
        thirdText.innerHTML = 'или';
        this.view.root.append(thirdText);
      }

      tipBlock.classList.add('search-tips__block');
      this.view.root.append(tipBlock);

      product.classList.add('search-tips__link');
      product.setAttribute('href', tip.link!);
      product.innerHTML = tip.product!;
      tipBlock.prepend(product);
    });
  }
}
