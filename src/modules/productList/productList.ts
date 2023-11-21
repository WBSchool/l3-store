import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import { analyticsService } from '../../services/analytics.service';

export class ProductList {
  view: View;
  products: ProductData[];
  viewedProducts: Set<number>;

  constructor() {
    this.products = [];
    this.viewedProducts = new Set();
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

    this.products.forEach((product) => {
      const productComp = new Product(product);
      window.addEventListener('scroll', () => this.handleProductView(productComp));
      productComp.render();
      productComp.attach(this.view.root);
      this.handleProductView(productComp);
    });
  }
  handleProductView(productComp: Product) {
    if (!this.viewedProducts.has(productComp.getProps().id)) {
      const productId = productComp.getProps().id;
      if (this.productInViewport(productComp.view.root)) {
        fetch(`/api/getProductSecretKey?id=${productId}`)
          .then((res) => res.json())
          .then((secretKey) => {
            analyticsService.sendProductViewport(productComp.getProps(), secretKey);
          });
        this.viewedProducts.add(productId);
      }
    }
  }
  productInViewport(elem: any) {
    let box = elem.getBoundingClientRect();
    let top = box.top;
    let left = box.left;
    let bottom = box.bottom;
    let right = box.right;
    let width = document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight;
    let maxWidth = 0;
    let maxHeight = 0;

    return (
      Math.min(height, bottom) - Math.max(0, top) >= maxHeight && Math.min(width, right) - Math.max(0, left) >= maxWidth
    );
  }
}
