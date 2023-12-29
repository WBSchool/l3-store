import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';
import { SearchTips } from '../searchTips/searchTips';
import { ProductList } from '../productList/productList';
import { tipsList } from '../searchTips/typesList';

class Homepage extends Component {
  popularProducts: ProductList;
  searchTips: SearchTips;

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);

    this.searchTips = new SearchTips();
    this.searchTips.attach(this.view.tips);
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

    if (tipsList?.length) {
      this.searchTips.update(tipsList);
    }
  }
}

export const homepageComp = new Homepage(html);
