import {Component} from "../component";
import html from './favorites.tpl.html';
import { ProductData } from 'types';
import {Product} from "../product/product";
import {favoritesService} from "../../services/favorites.service";


class Favorites extends Component {
  products!: ProductData[];


  async render () {
    this.products = await favoritesService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      productComp.render();
      productComp.attach(this.view.fav);
    });

  }

}

export const favoritesComp = new Favorites(html);