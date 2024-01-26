import { ProductData } from 'types';
import { Component } from '../component';
import html from './favorites.tpl.html';
import { favoriteService } from '../../services/favorite.service';
import { Product } from '../product/product';

class Favorites extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favoriteService.get();

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: false });

      productComp.render();
      productComp.attach(this.view.favorites);
    });
  }
}

export const favoritesComp = new Favorites(html);
