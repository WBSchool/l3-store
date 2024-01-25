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

  async render() {
    fetch('/api/getProducts', {
      headers: {
        UserID: window.userId
      }
    })
      .then((res) => res.json())
      .then((products) => {
        this.productList.update(products);
      });
  }
}

export const catalogComp = new Catalog(html);
