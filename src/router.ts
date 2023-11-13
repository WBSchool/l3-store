import { catalogComp } from './modules/catalog/catalog';
import { notFoundComp } from './modules/notFound/notFound';
import { homepageComp } from './modules/homepage/homepage';
import { productDetailComp } from './modules/productDetail/productDetail';
import { checkoutComp } from './modules/checkout/checkout';
import { favoriteProductsComp } from './modules/favoriteProducts/favoriteProducts';
import { eventAnalytics, typeEvent } from './services/event_analytics.service';

const ROUTES = {
  '/': homepageComp,
  '/catalog': catalogComp,
  '/product': productDetailComp,
  '/checkout': checkoutComp,
  '/favorite': favoriteProductsComp,
};

export default class Router {
  $appRoot: HTMLElement;

  constructor() {
    // @ts-ignore
    this.$appRoot = document.querySelector('.js__root');

    window.addEventListener('load', this.route.bind(this));
    window.addEventListener('hashchange', this.route.bind(this));
  }

  async route(e: any) {
    e.preventDefault();

    // @ts-ignore
    const component = ROUTES[window.location.pathname] || notFoundComp;

    const url: string = window.location.pathname;
    await eventAnalytics.sendEvent({
      type: typeEvent.route,
      payload: { url },
      timestamp: Date.now(),
    });

    component.attach(this.$appRoot);
    component.render();
  }
}
