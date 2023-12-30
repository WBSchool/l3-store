import html from './searchHintsBlock.tpl.html';
import { View } from '../../utils/view';
import { ViewTemplate } from '../../utils/viewTemplate';
import { addElement } from '../../utils/helpers';

export class SearchHints {
  view: View;
  hints!: any;

  constructor () {
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  update (hints: any) {
    this.hints = hints;
    this.render();
  }

  render () {
    addElement(this.view.root, 'span', {className: 'search-hints__frame-text', innerText: 'Например,'})
    const hints = this.hints;
    hints.forEach((hint: any, i: number) => {
      addElement(this.view.root, 'a', {className: 'search-hints__hint', innerText: hint.text, href: hint.link});
      if (hints.length - i > 2) {
        addElement(this.view.root, 'span', {className: 'search-hints__frame-text', innerText: ','});
      } else if (hints.length - i > 1) {
        addElement(this.view.root, 'span', {className: 'search-hints__frame-text', innerText: 'или'});
      }
    })
  }
}