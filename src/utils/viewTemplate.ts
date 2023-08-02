import { View } from './view';

export class ViewTemplate {
  root!: any;
  private _template: HTMLTemplateElement;

  static applyText(element: HTMLElement | DocumentFragment, dataModel?: any) {
    if (dataModel) {
      (element.querySelectorAll('[data-text]') as NodeListOf<any>).forEach((el) => {
        const text = el.dataset.text;
        if (text && dataModel[text]) {
          const place = el.dataset.place || 'innerText';
          el[place] = dataModel[text];
        }
      });
    }
  }

  static getView(element: HTMLElement, dataModel?: any) {
    if (dataModel) {
      ViewTemplate.applyText(element, dataModel);
    }
    const view = new View();
    (element.querySelectorAll('[data-tag]') as NodeListOf<HTMLElement>).forEach((el) => {
      if (el.dataset.tag) view[el.dataset.tag] = el;
    });
    view.root = element;
    view.querySelector = element.querySelector.bind(element);
    view.querySelectorAll = element.querySelectorAll.bind(element);
    return view;
  }

  constructor(html: string, dataModel?: any) {
    this._template = document.createElement('template');
    this._template.innerHTML = html;
    if (dataModel) {
      ViewTemplate.applyText(this._template.content, dataModel);
    }
  }

  cloneView(dataModel?: any) {
    const element = (this._template.content.cloneNode(true) as HTMLElement).firstElementChild as HTMLElement;
    return ViewTemplate.getView(element, dataModel || {});
  }
}
