import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorites.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import { favoritesService } from '../../services/favorites.service';

class Favorites extends Component {
  products!: ProductData[];

  async render() {
    this.products = await favoritesService.get();
    
    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      productComp.render();
      productComp.attach(this.view.cart);
    });

    const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    this.view.price.innerText = formatPrice(totalPrice);

    this.view.btnClear.onclick = this._clearFavorites.bind(this);
  }

  private async _clearFavorites() {
    await favoritesService.clear();
    await this.render()
  }
}

export const favoritesComp = new Favorites(html);
