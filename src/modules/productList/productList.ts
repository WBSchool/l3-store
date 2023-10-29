import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData , HTMLWithProductData } from 'types';
import { Product } from '../product/product';
import {analyticsService} from "../../services/analytics.service";

export class ProductList {
  view: View;
  products: ProductData[];

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';

    const observer = new IntersectionObserver(analyticsService.handleIntersections.bind(analyticsService));

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.root);

      const productElem: HTMLWithProductData = productComp.view.root as HTMLWithProductData;
      productElem.productData = product;
      observer.observe(productElem);
    });
  }
}
