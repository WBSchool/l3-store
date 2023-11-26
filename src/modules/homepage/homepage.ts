import { addElement, getSuggestions } from '../../utils/helpers';
import { Component } from '../component';
import html from './homepage.tpl.html';

import { ProductList } from '../productList/productList';
import { SearchSuggesionBlock } from '../searchSuggestionBlock/searchSuggesionBlock';

class Homepage extends Component {
  popularProducts: ProductList;
  suggestions: SearchSuggesionBlock

  constructor(props: any) {
    super(props);

    this.popularProducts = new ProductList();
    this.popularProducts.attach(this.view.popular);

    this.suggestions = new SearchSuggesionBlock();
    this.suggestions.attach(this.view.suggestions)
  }

  async render() {
    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.popularProducts.update(products);
      });

    const suggestions = await getSuggestions()  
    this.suggestions.update(suggestions)

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
