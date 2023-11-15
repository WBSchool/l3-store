import html from './hints.tpl.html';
import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { hintsArray } from '../../utils/constants';

export class Hints {
    view: View;
    hints!: string[];
  
    constructor() {
        this.view = new ViewTemplate(html).cloneView();
        this.hints = hintsArray;
    }

    attach($root: HTMLElement) {
        $root.appendChild(this.view.root);
    }

    render() {
        for (let i = 0; i < this.hints.length; ++i) {
            this.view[`hint${i + 1}`].innerText = this.hints[i];
        }
    } 
}

  