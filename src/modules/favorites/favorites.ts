import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorites.tpl.html';
import { ProductData } from 'types';
import {favoritesService} from "../../services/favorites.service";

class Favorites extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favoritesService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: false });
      productComp.render();
      productComp.attach(this.view.favorites);
    });
  }
}

export const favoritesComp = new Favorites(html);
