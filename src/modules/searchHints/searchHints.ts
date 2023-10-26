import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchHints.tpl.html';

export class SearchHints {
  view: View;
  suggestions: any[] = [];

  constructor(html: any) {
    this.view = new ViewTemplate(html).cloneView();
    this.getSuggestions();
  }

  async getSuggestions() {
    const suggestions = [
      {name: 'чехол iphone 13 pro', link: '#'},
      {name: 'коляски agex', link: '#'},
      {name: 'яндекс станция 2', link: '#'}
    ];

    this.update(suggestions);
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