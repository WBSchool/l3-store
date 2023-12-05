import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';
import api from '../../utils/api';

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

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal')

    const options = {
      root: null,
      rootMargin: "0px", 
      threshold: 0.75
    };

    const isEmpty = (object: { hasOwnProperty: (arg0: string) => any; }) => {
      for (let prop in object) {
        if (object.hasOwnProperty(prop)) return false;
      }
      return true;
    }

    const logIsEmpty = isEmpty(this.product.log);

    const property = !logIsEmpty ? 'viewCardPromo' : 'viewCard';

    const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
      
          fetch(`/api/getProductSecretKey?id=${id}`)
            .then((res) => res.json())
            .then((secretKey) => {
              api.sendEvent(property, {
                ...this.product,
                secretKey: secretKey
              });
            });
          observer.unobserve(entry.target)
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    observer.observe(this.view.root);
  }
}