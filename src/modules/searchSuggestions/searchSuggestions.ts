import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchSuggestions.tpl.html';

export class SearchSuggestions {
  view: View;

  constructor() {
    this.view = new ViewTemplate(html).cloneView();
  }
  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  render(suggestions: string[]) {
    const suggestionsContainer = this.view.root;
    if (suggestionsContainer) {
      suggestionsContainer.innerHTML = '';
      const exampleText = document.createElement('span');
      exampleText.classList.add('suggestions-list__text');
      exampleText.innerText = 'Например, ';
      suggestionsContainer.appendChild(exampleText);

      suggestions.forEach((text, index) => {
        const itemSpan = document.createElement('span');
        itemSpan.classList.add('suggestions-list__item', `suggestions-list__item-${index + 1}`);

        const innerSpan = document.createElement('span');
        innerSpan.innerText = text;
         
         itemSpan.appendChild(innerSpan);

        suggestionsContainer.appendChild(itemSpan);

        if (index < suggestions.length - 1) {
          const otherText = document.createElement('span');
          otherText.classList.add('suggestions-list__text');
          if (index < suggestions.length - 2) {
            otherText.innerText = ' , ';
          } else {
            otherText.innerText = ' или ';
          }
          suggestionsContainer.appendChild(otherText);
        }
      });
    }
  }
}
