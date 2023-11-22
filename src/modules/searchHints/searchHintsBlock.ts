import html from './searchHintsBlock.tpl.html';
import { View } from '../../utils/view';
import { ViewTemplate } from '../../utils/viewTemplate';
import { addElement } from '../../utils/helpers';
import { SearchHint } from '../searchHint/searchHint';

export class SearchHints {
  view: View;
  routeURL: string;
  hints!: string[];

  constructor () {
    this.view = new ViewTemplate(html).cloneView();
    this.routeURL = '/catalog'; // Временный адрес для тестирования до появления поисковой страницы
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  update (hints: string[]) {
    this.hints = hints;
    this.render();
  }

  render () {

    this._makeFrameElement(this.view.root, 'Например,');

    const hints = this.hints;
    hints.forEach((hint, i) => {
      const searchHintWrap = addElement(this.view.root, 'div', {className: 'search-hints__hint-wrap'});

      const searchHintComp = new SearchHint(hint, this.routeURL);
      searchHintComp.render();
      searchHintComp.attach(searchHintWrap);

      if (hints.length - i > 2) {

        this._makeFrameElement(searchHintWrap, ',');
      } else if (hints.length - i > 1) {

        this._makeFrameElement(this.view.root, 'или');
      }
    })
  }

  private _makeFrameElement (root: HTMLElement, text: string) {
    addElement(root, 'span', {className: 'search-hints__frame-text', innerText: text});
  }
}