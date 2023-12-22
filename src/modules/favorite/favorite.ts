import { Component } from '../component';
import html from './favorite.tpl.html';

import { ProductData } from 'types';
import { favoriteService } from '../../services/favorite.service';
import { Product } from '../product/product';

class Favorite extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favoriteService.get();

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.favorite);
    });
  }
}

export const favoriteComp = new Favorite(html);
