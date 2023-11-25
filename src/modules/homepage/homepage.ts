import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';

import { ProductList } from '../productList/productList';
import { SearchTags } from '../searchTags/searchTags';

const MOCK_TAGS = ['чехол iphone 13 pro', 'яндекс станция 2', 'коляски agex'];

class Homepage extends Component {
  popularProducts: ProductList;

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);
  }

  render() {
    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });

    const isSuccessOrder = new URLSearchParams(window.location.search).get('isSuccessOrder');
    if (isSuccessOrder != null) {
      const $notify = addElement(this.view.notifies, 'div', { className: 'notify' });
      addElement($notify, 'p', {
        innerText:
          'Заказ оформлен. Деньги спишутся с вашей карты, менеджер может позвонить, чтобы уточнить детали доставки'
      });
    }

    this.createSearchTags();
  }

  createSearchTags() {
    const tagsComp = new SearchTags(MOCK_TAGS);
    tagsComp.render();
    tagsComp.attach(this.view.searchTags);
  }
}

export const homepageComp = new Homepage(html);
