import { favoriteService } from "../../services/favorite.service";
import { Product } from '../product/product';
import { Component } from '../component';
import { ProductData } from 'types';
import html from './favorite.tpl.html';

export class Favorite extends Component {
  products?: ProductData[];

  async render() {
    this.products = await favoriteService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: false });
      productComp.render();
      productComp.attach(this.view.favorite);
    });
  }
}

export const favoriteComp = new Favorite(html);