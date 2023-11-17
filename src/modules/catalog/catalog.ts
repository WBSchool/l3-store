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
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();
    this.productList.update(products);
    const array = products.map((element: { log: any; }) => {
      return element.log;
    });
    console.log(products);
    console.log(array);
  }
}

export const catalogComp = new Catalog(html);
