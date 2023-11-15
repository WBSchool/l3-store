import html from './hints.tpl.html';
import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';

export class Hints {
    view: View;
  
    constructor() {
        this.view = new ViewTemplate(html).cloneView();
    }

    attach($root: HTMLElement) {
        $root.appendChild(this.view.root);
    }

    render() {

    }

}
  