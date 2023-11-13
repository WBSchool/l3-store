import { Component } from '../component';
import html from './favoriteProducts.tpl.html';
import { favoriteProductsService } from '../../services/favoriteProducts.service';
import { ProductData } from 'types';
import { ProductList } from '../productList/productList';

class FavoriteProducts extends Component {
  favoritesProducts!: ProductData[];
  favoritesProductsList!: ProductList;

  async render() {
    this.favoritesProducts = await favoriteProductsService.get();

    this.favoritesProductsList = new ProductList();
    this.favoritesProductsList.attach(this.view.favoriteProducts);

    if (this.favoritesProducts.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    } 

    this.favoritesProductsList.update(this.favoritesProducts);
  }

}

export const favoriteProductsComp = new FavoriteProducts(html);
