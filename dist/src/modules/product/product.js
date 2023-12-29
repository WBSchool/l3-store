import { ViewTemplate } from '../../utils/viewTemplate';
import { formatPrice } from '../../utils/helpers';
import html from './product.tpl.html';
export class Product {
    constructor(product, params = {}) {
        this.product = product;
        this.params = params;
        this.view = new ViewTemplate(html).cloneView();
    }
    attach($root) {
        $root.appendChild(this.view.root);
    }
    render() {
        const { id, name, src, salePriceU } = this.product;
        this.view.root.setAttribute('href', `/product?id=${id}`);
        this.view.img.setAttribute('src', src);
        this.view.title.innerText = name;
        this.view.price.innerText = formatPrice(salePriceU);
        if (this.params.isHorizontal)
            this.view.root.classList.add('is__horizontal');
    }
}
