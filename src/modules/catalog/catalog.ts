import { Component } from '../component';
import html from './catalog.tpl.html';

import { ProductList } from '../productList/productList';
import { analyticsService } from '../../services/analytics.service';

class Catalog extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();
    this.productList.update(products);

    //Передаем аналитику попадания товаров во viewport после рендера страницы
    analyticsService.processProducts(Array.from(this.view.products.querySelectorAll('.product')), products);

    //Вешаем слушатель события на скролл (по завершению прокрутки страницы)
    document.addEventListener('scrollend', () => {
      analyticsService.processProducts(Array.from(this.view.products.querySelectorAll('.product')), products);
    });
  }
}

export const catalogComp = new Catalog(html);
