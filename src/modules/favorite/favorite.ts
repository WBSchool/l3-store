import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorite.tpl.html';
import { favoriteService } from '../../services/favorite.service';
import { ProductData } from 'types';

class Favorite extends Component {
    products!: ProductData[];

    async render() {
        this.products = await favoriteService.getFavorites(); //Получаю список вещей в фаворитах

        //Если их нету, добавлю специальный класс "Пусто"
        if (this.products.length < 1) {
            this.view.root.classList.add('is__empty');
            return;
        }

        //Если фавориты есть, отображу их в 'favList' на странице
        this.products.forEach((product) => {
            const productComp = new Product(product, { isHorizontal: false });
            productComp.render();
            productComp.attach(this.view.favList);
        });
    }
}

export const favoriteComp = new Favorite(html);
