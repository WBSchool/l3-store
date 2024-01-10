import { Component } from '../component';
import html from './favorites.tpl.html';
import { ProductData } from 'types';
import { favoritesService } from '../../services/favorites.service';
import { ProductList } from '../productList/productList';

class Favorites extends Component {
  favoriteProducts!: ProductData[];
  favoritesProductsList: ProductList;

  constructor(props: any) {
    super(props);
    this.favoritesProductsList = new ProductList();
    this.favoritesProductsList.attach(this.view.list);
  }

  async render() {
    this.favoriteProducts = await favoritesService.get();
    this.favoritesProductsList.update(this.favoriteProducts);
  }
}

export const favoritesComp = new Favorites(html);