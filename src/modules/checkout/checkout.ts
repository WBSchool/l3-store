import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import api from '../../utils/api';
import { genUUID } from '../../utils/helpers';

class Checkout extends Component {
  products!: ProductData[];

  async render() {
    this.products = await cartService.get();
    console.log(this.products);

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

    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private async _makeOrder() {
    await cartService.clear();

    const orderId = genUUID();
    const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    const productIds = this.products.map(function (object) {
      return object.id;
    });

    api.sendEvent('purchase', {
      orderId: orderId, 
	    totalPrice: totalPrice, 
	    productIds: productIds 
    });

    fetch('/api/makeOrder', {
      method: 'POST',
      body: JSON.stringify(this.products)
    });
    window.location.href = '/?isSuccessOrder';
  }
}

export const checkoutComp = new Checkout(html);
