import { ViewTemplate } from '../utils/viewTemplate';
export class Component {
    constructor(html) {
        this.data = {};
        this.view = new ViewTemplate(html).cloneView();
    }
    attach($root) {
        $root.innerHTML = '';
        $root.appendChild(this.view.root);
    }
    update(data) {
        this.data = data;
        this.render();
    }
    render() { }
}
