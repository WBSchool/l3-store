import { catalogComp } from './modules/catalog/catalog';
import { notFoundComp } from './modules/notFound/notFound';
import { homepageComp } from './modules/homepage/homepage';
import { productDetailComp } from './modules/productDetail/productDetail';
import { checkoutComp } from './modules/checkout/checkout';
import { favoriteComp } from './modules/favorite/favorite';
import { statisticsService } from './services/statistics';

const ROUTES = {
  '/': homepageComp,
  '/catalog': catalogComp,
  '/product': productDetailComp,
  '/checkout': checkoutComp,
  '/favorite': favoriteComp
};

export default class Router {
  $appRoot: HTMLElement;

  constructor() {
    // @ts-ignore
    this.$appRoot = document.querySelector('.js__root');

    window.addEventListener('load', this.route.bind(this));
    window.addEventListener('hashchange', this.route.bind(this));
  }

  route(e: any) {
    if (e) {
      e.preventDefault();
    }

    // @ts-ignore
    const component = ROUTES[window.location.pathname] || notFoundComp;

    const urlPage = window.location.href;
    statisticsService.routeEvent(urlPage);
    component.attach(this.$appRoot);
    component.render();
  }
}
