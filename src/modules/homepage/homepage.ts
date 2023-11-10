import { addElement } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';

import { ProductList } from '../productList/productList';
import { SearchHints } from '../searchHints/searchHints';

class Homepage extends Component {
  popularProducts: ProductList;
  searchHintsBlock: SearchHints;

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);

    //Добавил блок подсказок для поиска
    this.searchHintsBlock = new SearchHints();
    this.searchHintsBlock.attach(this.view.hints)
  }

  render() {

    //Заменить на fetch с получением подсказок и апдейтом с полученным значением
    //Список подсказок
    const hintsList = [{ productName: 'чехол iphone 13 pro' }, { productName: 'коляски agex' }, { productName: 'яндекс станция 2' }];
    this.searchHintsBlock.update(hintsList);

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
  }
}

export const homepageComp = new Homepage(html);
