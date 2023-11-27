import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import {formatPrice, genUUID} from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import {analyticsService} from "../../services/analytics.service";

class Checkout extends Component {
  products!: ProductData[];
totalPrice:number
  constructor(props:any) {
    super(props);
    this.totalPrice = 0
  }



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
    //обновляем
   this.totalPrice= totalPrice
    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private async _makeOrder() {

let productIds = this.products.map(item=>item.id)

    const payload = {
  orderId: genUUID(),
      totalPrice:this.totalPrice,
      productIds
    }
    try{
  await cartService.clear();
  await fetch('/api/makeOrder', {
      method: 'POST',
      body: JSON.stringify(this.products)
    });
  await analyticsService.sendEvent('purchase',payload)
      }catch (error){
  console.error(error)
    }
    // чтобы перенаправление работало в любом случае
    finally {
      window.location.href = '/?isSuccessOrder';
    }

  }

}
export const checkoutComp = new Checkout(html);
