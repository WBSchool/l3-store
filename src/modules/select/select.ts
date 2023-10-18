import { Component } from '../component';
import { Product } from '../product/product';
import html from './select.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import { selectedProducts } from './data';

class Select extends Component {
  products!: ProductData[];

  async render() {
    this.products = selectedProducts;

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

export const selectComp = new Select(html);
