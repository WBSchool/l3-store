import { Component } from "../component";
import html from './favorite.tpl.html';
import { Product } from '../product/product';
import { favoriteService } from "../../services/favourite.service";
import { ProductData } from 'types';

class Favorite extends Component {
  products!: ProductData[];
  
  async render() {
    this.products = await favoriteService.get();
  
    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

     this.products.forEach((product) => {
       const productComp = new Product(product, { isHorizontal: true });
       productComp.render();
       productComp.attach(this.view.favorite);
     });
  }
}
export const favoriteComp = new Favorite(html);