import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';

import { ProductList } from '../productList/productList';
import { SearchTips } from '../search-tips/search-tips';

class Homepage extends Component {
  popularProducts: ProductList;
  searchTips: SearchTips;

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);
    
    this.searchTips = new SearchTips();
    this.searchTips.attach(this.view.searchTips);
  }

  render() {
    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });
    
    //Массив с подсказками
    const tipsList: any[] = [
      {
        product: 'чехол iphone 13 pro',
        link: 'http://localhost:3000/product?id=68988778',
      },
      {
        product: 'коляски agex',
        link: 'http://localhost:3000/product?id=23119804',
      },
      {
        product: 'яндекс станция 2',
        link: 'http://localhost:3000/product?id=90466699',
      },
    ]
    //Если получили данные подсказок
    if (tipsList.length) {
      this.searchTips.update(tipsList);
    };

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
