import { ViewTemplate } from "../../utils/viewTemplate";
import { View } from "../../utils/view";
import html from "./searchTips.tpl.html";
import { SearchTipsTypes } from "types";

export class SearchTips {
    view: View;
    tips: SearchTipsTypes[];

    constructor() {
        this.tips = [];
        this.view = new ViewTemplate(html).cloneView();
    }

    attach($root: HTMLElement) {
        $root.innerHTML = '';
        $root.appendChild(this.view.root);
    }

    update(tips: SearchTipsTypes[]) {
        this.tips = tips;
        this.render();
    }

    _printSearchTips() {
        
    }

    render() {
        this.view.root.innerHTML = '';

        const tipsContainer = document.createElement('p');
        tipsContainer.classList.add('search-text');
        
        for (let i = 0; i < this.tips.slice(0, 3).length; i++) {
            if (!this.tips?.length) return;
            
            if (this.tips.length === 1) {
                tipsContainer.innerHTML = `Например, <span class="tips">${this.tips[0].name}</span>`;
            } else if (this.tips.length === 2) {
                tipsContainer.innerHTML = `Например, <span class="tips">${this.tips[0].name}</span>, <span class="tips">${this.tips[1].name}</span>`;
            } else {
                tipsContainer.innerHTML = `Например, <span class="tips">${this.tips[0].name}</span>, <span class="tips">${this.tips[1].name}</span> или <span class="tips">${this.tips[2].name}</span>`
            }

        }

        this.view.root.append(tipsContainer);
    }
}