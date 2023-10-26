import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import {formatPrice, genUUID} from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import {analyticsService} from "../../services/analytics.service";

class Checkout extends Component {
  products!: ProductData[];
  totalPrice: number = 0;

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

    this.totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    this.view.price.innerText = formatPrice(this.totalPrice);

    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private async _makeOrder() {
    await cartService.clear();

    const productIds = this.products.map(product => product.id);
    const totalPrice = Math.floor(this.totalPrice / 1000);

    fetch('/api/makeOrder', {
      method: 'POST',
      body: JSON.stringify(this.products)
    });

    analyticsService.sendAnalytics({
      type: 'purchase',
      payload: {orderId: genUUID(), totalPrice, productIds},
      timestamp: Date.now()
    });

    window.location.href = '/?isSuccessOrder';
  }
}

export const checkoutComp = new Checkout(html);
