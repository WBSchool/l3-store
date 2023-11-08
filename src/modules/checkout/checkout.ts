import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { eventAnalyticsService } from '../../services/eventAnalytics.service';
import { ProductData } from 'types';

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

    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private async _makeOrder() {
    const productsIds = this.products.map(product => product.id); //Получение всех айди товаров в корзине 
    const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0); //Получение общей цены в корзине 

    //Отправка ивента purchase (Пока нету айди Товара - генерируется случайное число)
    eventAnalyticsService.sendEvent({
      type: 'purchase',
      payload: {
        orderId: Math.floor(Math.random() * 1000),
        totalPrice: totalPrice,
        productIds: productsIds,
      },
      timestamp: Date.now(),
    });

    await cartService.clear();
    fetch('/api/makeOrder', {
      method: 'POST',
      body: JSON.stringify(this.products)
    });
    window.location.href = '/?isSuccessOrder';
  }
}

export const checkoutComp = new Checkout(html);
