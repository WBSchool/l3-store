import { Component } from '../component';
import html from './searchSuggestions.tpl.html';

class SearchSuggestions extends Component {
    suggestions: string[] = [];

    attach($root: HTMLElement) {
        $root.innerHTML = '';
        $root.appendChild(this.view.root);
    }

    async render() {
        this.suggestions = await this.getSuggestions();
        this.view.hints.innerHTML = '<span>Например,&nbsp;</span>';

        for (let ind in this.suggestions) {
            const hint = this.suggestions[ind];

            const textElem = document.createElement('span');
            textElem.innerHTML = hint;
            textElem.classList.add('search-suggestions__hints--item--text');
            const hintElem = document.createElement('span');
            hintElem.classList.add('search-suggestions__hints--item');
            hintElem.addEventListener('click', () => {
                this.setInputText(Number(ind));
            });


            hintElem.append(textElem);

            this.view.hints.appendChild(hintElem);

            if (Number(ind) === 0) {
                const separator = document.createElement('span');
                separator.innerHTML = ',&nbsp;';
                this.view.hints.appendChild(separator);    
            } else if (Number(ind) === 1) {
                const separator = document.createElement('span');
                separator.innerHTML = '&nbsp;или&nbsp;';
                this.view.hints.appendChild(separator);   
            }
        }
    }

    async getSuggestions() {
        // Имитация запроса на сервер
        return ['чехол iphone 13 pro', 'коляски agex', 'яндекс станция 2'];
    }

    setInputText(ind: number) {
        this.view.input.value = this.suggestions[ind];
    }
};

export const searchSuggestions = new SearchSuggestions(html);
