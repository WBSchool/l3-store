// import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import { ProductList } from "../productList/productList";
import html from './favorite.tpl.html';
import { ProductData } from 'types';
import { cartService } from './../../services/cart.service';

class Favorite extends Component {
  favoriteProductsList: ProductList;
  favoriteProducts!: ProductData[];
  constructor(props: any) {
    super(props);
    this.favoriteProductsList = new ProductList();
    this.favoriteProductsList.attach(this.view.favorite__list);

  }

  
  render() {
    this.favoriteProducts = cartService.getFavorites();
    if (!this.favoriteProducts.length) {
      this.view.favorite__empty.classList.add('is__empty');
      return;
    }
    this.favoriteProductsList.update(this.favoriteProducts);
  }
}

export const favoriteComp = new Favorite(html);
