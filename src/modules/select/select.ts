import { Component } from '../component';
import html from './select.tpl.html';
import { ProductData } from 'types';
import { selectService } from '../../services/select.service';
import { ProductList } from '../productList/productList';

class Select extends Component {
  selectedProducts!: ProductList;
  products!: ProductData[];

  constructor(props: any) {
    super(props);
  
    this.selectedProducts = new ProductList();
    this.selectedProducts.attach(this.view.cart);
  }

  async render() {
    this.products =  await selectService.get()

    this.selectedProducts.update(this.products)

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    

  }

  
}

export const selectComp = new Select(html);






