import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchHints.tpl.html';
import {ProductData} from "../../../types";

export class SearchHints {
  view: View;
  suggestions: {name: string, link: string}[] = [];

  constructor(html: any) {
    this.view = new ViewTemplate(html).cloneView();
    this.getSuggestions();
  }

  async getSuggestions() {
    // Для тестирования модуля. Получаем 3 рандомных объекта.
    /*let suggestions: {name: string, link: string}[] = await this.getRandomSuggestions();
    if (suggestions.length > 0) {
      this.update(suggestions);
      return;
    }*/

    const MockSuggestions = [
      {name: 'чехол iphone 13 pro', link: '#'},
      {name: 'коляски agex', link: '#'},
      {name: 'яндекс станция 2', link: '#'}
    ];
    this.update(MockSuggestions);
  }

  async getRandomSuggestions() {
    let products: ProductData[] = await fetch('/api/getPopularProducts').then(response => response.json());

    if (products && products.length > 0) {
      // Пропускаем те, названия которых составляют не больше слов чем указано
      products = products.filter((item: ProductData) => (item.name.split(' ').length <= 3));
    } else {
      return [];
    }

    const suggestions = [];
    for (let i = 0; i < 3; i++) {
      const {name, id} = products[Math.floor(Math.random() * products.length)];
      suggestions.push({
        name,
        link: `/product?id=${id}`
      });
    }

    console.log('suggestions[]', suggestions);
    return suggestions;
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(data: any) {
    this.suggestions = data;
    this.render();
  }


  render() {
    // Берем все span для подсказок
    const hintsElems = this.view.search_hints.children;
    // Вставляем в каждый span название с ссылкой товара
    for (let i = 0; i < hintsElems.length; i++) {
      hintsElems[i].innerHTML = `<a class="hint__link" href=${this.suggestions[i].link}>${this.suggestions[i].name}</a>`;
    }

  }
}

export const searchHintsComp = new SearchHints(html);