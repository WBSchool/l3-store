import { View } from './view';
export class ViewTemplate {
    static applyText(element, dataModel) {
        if (dataModel) {
            element.querySelectorAll('[data-text]').forEach((el) => {
                const text = el.dataset.text;
                if (text && dataModel[text]) {
                    const place = el.dataset.place || 'innerText';
                    el[place] = dataModel[text];
                }
            });
        }
    }
    static getView(element, dataModel) {
        if (dataModel) {
            ViewTemplate.applyText(element, dataModel);
        }
        const view = new View();
        element.querySelectorAll('[data-tag]').forEach((el) => {
            if (el.dataset.tag)
                view[el.dataset.tag] = el;
        });
        view.root = element;
        view.querySelector = element.querySelector.bind(element);
        view.querySelectorAll = element.querySelectorAll.bind(element);
        return view;
    }
    constructor(html, dataModel) {
        this._template = document.createElement('template');
        this._template.innerHTML = html;
        if (dataModel) {
            ViewTemplate.applyText(this._template.content, dataModel);
        }
    }
    cloneView(dataModel) {
        const element = this._template.content.cloneNode(true).firstElementChild;
        return ViewTemplate.getView(element, dataModel || {});
    }
}
