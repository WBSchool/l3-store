import { Component } from '../component';
import html from './favorite.tpl.html';
import { ProductList } from '../productList/productList';
import { favoriteService } from '../../services/favorite.service';

class Favorite extends Component {
  favoriteProducts: ProductList;

  constructor(props: any) {
    super(props);

    this.favoriteProducts = new ProductList();
    this.favoriteProducts.attach(this.view.favoriteProducts);
  }

  async render() {
    const products = await favoriteService.get();
    this.favoriteProducts.update(products);
  }
}
export const favoritesComp = new Favorite(html);
