import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import { analyticsService } from '../../services/analytics.service';
import { genUUID } from '../../utils/helpers';

class Checkout extends Component {
  products!: ProductData[];
 
  async render() {
    this.products = await cartService.get();
    let arrIdProducts: number[] = [];
    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      arrIdProducts.push(product.id);
      productComp.render();
      productComp.attach(this.view.cart);
    });

    const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    this.view.price.innerText = formatPrice(totalPrice);

    this.view.btnOrder.onclick = this._makeOrder.bind(this,totalPrice,arrIdProducts);
  }

  private async _makeOrder(totalPrice:number,arrIdProducts:number[]) {
    await cartService.clear();
    fetch('/api/makeOrder', {
      method: 'POST',
      body: JSON.stringify(this.products)
    });
    const id = genUUID();
    analyticsService.sendMakeOrder({ id, totalPrice, arrIdProducts });
    arrIdProducts = [];
    window.location.href = '/?isSuccessOrder';
    
  }
}

export const checkoutComp = new Checkout(html);
