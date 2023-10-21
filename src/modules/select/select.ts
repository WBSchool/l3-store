import { Component } from '../component';
import html from './select.tpl.html';
import { ProductData } from 'types';
import { selectService } from '../../services/select.service';
import { ProductList } from '../productList/productList';

class Select extends Component {
  selectedProductsList!: ProductList;
  selectedProducts!: ProductData[];

  constructor(props: any) {
    super(props);
  
    this.selectedProductsList = new ProductList();
    this.selectedProductsList.attach(this.view.cart);
  }

  async render() {
    this.selectedProducts =  await selectService.get()
    this.selectedProductsList.update(this.selectedProducts)

    if (this.selectedProducts.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }
  }
}

export const selectComp = new Select(html);






