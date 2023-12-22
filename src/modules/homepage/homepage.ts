import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';

import { ProductList } from '../productList/productList';
import { analyticsService } from '../../services/analytics.service';

class Homepage extends Component {
  popularProducts: ProductList;

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);
  }

  async render() {
    await fetch('/api/getPopularProducts')
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

    //Передаем аналитику попадания товаров во viewport после рендера страницы
    analyticsService.processProducts(Array.from(this.view.popular.querySelectorAll('.product')), this.popularProducts.products);

    //Вешаем слушатель события на скролл (по завершению прокрутки страницы)
    document.addEventListener('scrollend', () => {
      analyticsService.processProducts(Array.from(this.view.popular.querySelectorAll('.product')), this.popularProducts.products);
    });
  }
}

export const homepageComp = new Homepage(html);
