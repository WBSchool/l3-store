import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';
import { userService } from '../../services/user.service';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;

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

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          const eventType = Object.entries(this.product.log).length > 0 ? 'viewCardPromo' : 'viewCard';

          const secretKey = await fetch(`/api/getProductSecretKey?id=${this.product.id}`)
            .then((res) => res.json())
            .then((secretKey) => secretKey);

          userService.sendingEventStatistics(eventType, { ...this.product, secretKey });
          observer.unobserve(entry.target);
        }
      })
    }, {
      root: null,
      threshold: 0.5
    });

    observer.observe(this.view.root);
  }
}