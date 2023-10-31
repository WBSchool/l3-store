import {ViewTemplate} from '../../utils/viewTemplate';
import {View} from '../../utils/view';
import {formatPrice} from '../../utils/helpers'
import html from './product.tpl.html';
import {ProductData} from 'types';
import {cartService} from "../../services/cart.service";
import {favoritesService} from "../../services/favorites.service";

type ProductComponentParams = { [key: string]: any };

export class Product {
    view: View;
    product: ProductData;
    params: ProductComponentParams;

    constructor(product: ProductData, params: ProductComponentParams = {}) {
        this.product = product;
        this.params = params;
        this.view = new ViewTemplate(html).cloneView();
    }

    attach($root: HTMLElement) {
        $root.appendChild(this.view.root);
    }

    render() {
        const {id, name, src, salePriceU} = this.product;

        this.view.root.setAttribute('href', `/product?id=${id}`);
        this.view.img.setAttribute('src', src);
        this.view.title.innerText = name;
        this.view.price.innerText = formatPrice(salePriceU);
        this.view.btnDel.onclick = this._removeFromCart.bind(this);

        if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal');
    }

    private _removeFromCart(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        const target = event.target as HTMLElement;
        const closestProduct = target.closest('.product');
        if (closestProduct) {
            closestProduct.remove();
        }
        if (!this.product) return;
        if(location.pathname === '/checkout') {
            cartService.removeProduct(this.product);
        } else {
            favoritesService.removeProduct(this.product);
        }
    }
}


