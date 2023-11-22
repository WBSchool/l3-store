import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';
import { statService } from '../../services/stat.service';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;
  observer!: IntersectionObserver;

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  render() {
    const { id, name, src, salePriceU } = this.product;

    this.view.root.setAttribute('href', `/product?id=${id}`);
    this.view.img.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.price.innerText = formatPrice(salePriceU);

    this.observer = new IntersectionObserver(this._viewportCallback.bind(this), {threshold: 0.5});
    if (!this.params.isStatNotRequired) this.observer.observe(this.view.root);

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal');
  }

  private _viewportCallback (entries: any, observer: IntersectionObserver) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        const timestamp = Date.now();
        fetch(`/api/getProductSecretKey?id=${this.product.id}`)
          .then((res) => res.json())
          .then((secretKey) => {
            statService.sendViewportStat(this.product, secretKey, timestamp);
          });

        observer.unobserve(entry.target);
      }
    })
  }
}