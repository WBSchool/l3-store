import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchHints.tpl.html';

import { searchHintsList } from '../../../types'

export class SearchHints {
    view: View;
    searchHintsNames: searchHintsList;

    constructor() {
        this.view = new ViewTemplate(html).cloneView();

        //Изначально подсказок нет
        this.searchHintsNames = [];
    }

    //Добавляем содержимое 
    attach($root: HTMLElement) {
        $root.innerHTML = '';
        $root.appendChild(this.view.root);
    }

    //При измененни подсказок, обновляем их и перерендериваем 
    update(searchHintsNames: searchHintsList) {
        this.searchHintsNames = searchHintsNames;
        this.render();
    }

    render() {
        //Меняем пробелы на '%20'
        const hrefsProductsNames = this.searchHintsNames.map(el => el.productName.replace(/ /g, "%20"));

        //Изменяем содержимое ссылки и href
        this.view.hintFirst.innerHTML = this.searchHintsNames[0].productName;
        this.view.hintFirst.setAttribute('href', `https://www.wildberries.ru/catalog/0/search.aspx?search=${hrefsProductsNames[0]}`);
        this.view.hintSecond.innerHTML = this.searchHintsNames[1].productName;
        this.view.hintSecond.setAttribute('href', `https://www.wildberries.ru/catalog/0/search.aspx?search=${hrefsProductsNames[1]}`);
        this.view.hintThird.innerHTML = this.searchHintsNames[2].productName;
        this.view.hintThird.setAttribute('href', `https://www.wildberries.ru/catalog/0/search.aspx?search=${hrefsProductsNames[2]}`);
    }
}
