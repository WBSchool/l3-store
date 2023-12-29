import { ViewTemplate } from '../../utils/viewTemplate';
import html from './productList.tpl.html';
import { Product } from '../product/product';
export class ProductList {
    constructor() {
        this.products = [];
        this.view = new ViewTemplate(html).cloneView();
    }
    attach($root) {
        $root.innerHTML = '';
        $root.appendChild(this.view.root);
    }
    update(products) {
        this.products = products;
        this.render();
    }
    render() {
        this.view.root.innerHTML = '';
        this.products.forEach((product) => {
            const productComp = new Product(product);
            productComp.render();
            productComp.attach(this.view.root);
        });
        yield favoriteService.checkingFavorites();
    }
}
