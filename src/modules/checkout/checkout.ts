import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice, genUUID } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import { analyticsService } from '../../services/analytics.service';

class Checkout extends Component {
  products!: ProductData[];

  async render() {
    this.products = await cartService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    const productIds: Number[] = [];
    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      productIds.push(product.id);
      productComp.render();
      productComp.attach(this.view.cart);
    });

    const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    this.view.price.innerText = formatPrice(totalPrice);

    this.view.btnOrder.onclick = this._makeOrder.bind(this, Math.round(totalPrice / 1000), productIds);     
  }

    private async _makeOrder(totalPrice:Number, productIds:Array<Number>) {
      await cartService.clear();
      fetch('/api/makeOrder', {
        method: 'POST',
        body: JSON.stringify(this.products)
      });

      //Передаем аналитику при оформлении заказа
      analyticsService.eventPlaceAnOrder(genUUID(), totalPrice, productIds);

      window.location.href = '/?isSuccessOrder';
    }
}

export const checkoutComp = new Checkout(html);
