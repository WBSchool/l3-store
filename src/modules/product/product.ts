import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';
import { eventAnalyticsService } from '../../services/eventAnalytics.service';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();
  }

  //Функция отправки при просмотре товара в списке товаров
  private async _viewCardAnalytics() {
    const isEmptoObject = Object.keys(this.product.log).length === 0; //Получение информации о пустом свойстве log у товара

    //Получение секретного ключа товара
    fetch(`/api/getProductSecretKey?id=${this.product.id}`) //Получение секретного ключа
      .then((res) => res.json())
      .then((sKey) => {
        //Отправка ивента viewCard
        eventAnalyticsService.sendEvent({
          type: isEmptoObject ? 'viewCard' : 'viewCardPromo',
          payload: {
            productData: this.product,
            secretKey: sKey,
          },
          timestamp: Date.now(),
        });
      });
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  async render() {
    const { id, name, src, salePriceU } = this.product;

    this.view.root.setAttribute('href', `/product?id=${id}`);
    this.view.img.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.price.innerText = formatPrice(salePriceU);

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal')

    setTimeout(() => this._viewCardAnalytics(), 250); //Вызываю функцию отправки ивента с небольшой задержкой
  }
}