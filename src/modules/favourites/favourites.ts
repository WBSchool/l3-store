import { Component } from '../component';
import html from './favourites.tpl.html';
import { favouritesService } from '../../services/favourites.service';
import { ProductData } from 'types';
import {ProductList} from "../productList/productList";

class Favourites extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favouritesService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    const favouritesProducts = new ProductList();
    favouritesProducts.attach(this.view.favourites);
    favouritesProducts.update(this.products);
  }
}

export const favouritesComp = new Favourites(html);
