import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import { cartService } from '../../services/cart.service';

class Checkout extends Component {
  products!: ProductData[];

  async render() {
    this.products = await cartService.get();

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

    
  }

  
}

export const checkoutComp = new Checkout(html);
