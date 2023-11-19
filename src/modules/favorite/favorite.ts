import { Component } from '../component';
import html from './favorite.tpl.html';
import { favoriteService } from '../../services/favorite.service';

import { ProductList } from '../productList/productList';

class Favorite extends Component {
  productList: ProductList;
  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.favorite);
  }
  async render() {
    const products = await favoriteService.get();
    this.productList.update(products);
    if (products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }
  }
}
export const favoriteComp = new Favorite(html);
