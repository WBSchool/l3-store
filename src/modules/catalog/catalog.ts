import { Component } from '../component';
import html from './catalog.tpl.html';

import { ProductList } from '../productList/productList';

class Catalog extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  // Насколько я понял, заголовок на получение товаров нужно добавить только к этому запросу.
  // Во всех остальных местах он есть.
  async render() {
    const productsResp = await fetch('/api/getProducts', {
      headers: {
        'x-userid': window.userId
      }
    });
    const products = await productsResp.json();
    this.productList.update(products);
  }
}

export const catalogComp = new Catalog(html);
