import { ProductData } from "types";
import { Component } from "../component";
import { favoriteService } from "../../services/favorite.service";
import { Product } from "../product/product";
import html from './favorite.tpl.html';

class Favorite extends Component {
    products!: ProductData[];

    async render() {
        this.products = await favoriteService.get();

        this.products.forEach((product) => {
            const productComp = new Product(product, {isHorizontal: false});

            productComp.render();
            productComp.attach(this.view.favorite);
        });
    }

}

export const favoriteComp = new Favorite(html)