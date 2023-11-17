import { Component } from '../component';
import html from './favorites.tpl.html';
import { Product } from '../product/product';
import { favService } from '../../services/fav.service';
import { ProductData } from 'types';

class Favorites extends Component {
    products!: ProductData[];

    async render() {
        this.products = await favService.get();

        if (this.products.length < 1) {
            this.view.root.classList.add('is__empty');
            return;
        }

        this.products.forEach((product) => {
            const productComp = new Product(product);
            productComp.render();
            productComp.attach(this.view.fav);
        });
    }
}

export const favoritesComp = new Favorites(html);
