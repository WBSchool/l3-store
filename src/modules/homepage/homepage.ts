import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';

import { ProductList } from '../productList/productList';
import { userService } from '../../services/user.service';
import { SearchHints } from '../searchHints/searchHints';

class Homepage extends Component {
  popularProducts: ProductList;
  searchHints: SearchHints;

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    this.searchHints = new SearchHints();
    this.popularProducts.attach(this.view.popular);
    this.searchHints.attach(this.view.searchBlock);
  }

  async render() {
    const userId = await userService.getId();
    fetch('/api/getPopularProducts', {
      headers: {
        'x-userid': userId
      }
    })
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
        this.searchHints.update(products);
      });

    const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
    if (isSuccessOrder != null) {
      const $notify = addElement(this.view.notifies, 'div', { className: 'notify' });
      addElement($notify, 'p', {
        innerText:
          'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
      });
    }
  }
}

export const homepageComp = new Homepage(html);
