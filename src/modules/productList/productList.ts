import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import { favoriteService } from "../../services/favorite.service";

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

    // Отрисовка кнопки избранное
    favoriteService.checkingFavorites();

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.root);
    });
  }
}
