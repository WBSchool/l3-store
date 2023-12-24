import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import { sendAnalytic } from '../../services/analytics.service';

export class ProductList {
  view: View;
  products: ProductData[];
  observer: IntersectionObserver;

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
    this.observer = new IntersectionObserver(this.observerCallback.bind(this), {});
  }

  observerCallback(Entities: IntersectionObserverEntry[], _: IntersectionObserver) {
    Entities.forEach((Entitie) => {
      const target = Entitie.target as HTMLAnchorElement;
      if (Entitie.isIntersecting) {
        if (Entitie.target.tagName !== 'A') return;
        const { href } = target;
        const ID = +href.split('?id=')[1];
        const product = this.products.find((Prod) => Prod.id === ID);
        if (!product) return;
        sendAnalytic.sendViewCardAnalytic(product)
      }
    });
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
      productComp.render();
      productComp.attach(this.view.root);
    });
    this.observer.disconnect();
    Array.from(this.view.root.children).forEach((Element) => this.observer.observe(Element));
  }
}
