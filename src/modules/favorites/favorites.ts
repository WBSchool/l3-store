import html from './favorites.tpl.html';
import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { favoriteService } from '../../services/favorite.service';

class FavoritesPage extends Component {
  products = new ProductList();
  constructor(props: any) {
    super(props);
    this.products.attach(this.view.favoriteProducts);
  }
  async render() {
    this.products.update(await favoriteService.getProducts());
  }
}
export const favoritesComp = new FavoritesPage(html);
