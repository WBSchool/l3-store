import { catalogComp } from './modules/catalog/catalog';
import { notFoundComp } from './modules/notFound/notFound';
import { homepageComp } from './modules/homepage/homepage';
import { productDetailComp } from './modules/productDetail/productDetail';
import { checkoutComp } from './modules/checkout/checkout';
import { favoriteComp } from "./modules/favorite/favorite";
import { Component } from './modules/component';

const ROUTES: Record<string, Component> = {
  '/': homepageComp,
  '/catalog': catalogComp,
  '/product': productDetailComp,
  '/checkout': checkoutComp,
  '/favorite': favoriteComp
};

export default class Router {
  $appRoot: HTMLElement | null;

  constructor() {
    this.$appRoot = document.querySelector('.js__root');

    window.addEventListener('load', this.route.bind(this));
    window.addEventListener('hashchange', this.route.bind(this));
  }

  route(e: Event) {
    e.preventDefault();

    const component = ROUTES[window.location.pathname] || notFoundComp;

    if(!this.$appRoot) return;
    component.attach(this.$appRoot);
    component.render();
  }
}
