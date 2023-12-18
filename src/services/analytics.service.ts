import { isInViewport } from '../utils/helpers';

class AnalyticsService {
  //Массив id отправленных товаров
  arrayIdsOfSendProducts:String[];

  constructor () {
    this.arrayIdsOfSendProducts = [];
  }

  /**
   * Переход по страницам
   * @param path URL путь страницы
   */
  async eventNavigatePages(path:String) {
    const data = {
      type: 'route',
      payload: {
        url: path,
      },
      timestamp: Date.now(),
    }
    this.postDataAnalytics(data);
  }

  /**
   * Просмотр карточки товара в списке товаров
   * @param secretKey Секретный ключ товара
   * @param props Свойства товара
   * @param type Тип события
   */
  async eventViewProduct(secretKey:String, props:Object, type:String) {
    const data = {
      type: type,
      payload: {
        secretKey: secretKey,
        props: props,
      },
      timestamp: Date.now(),
    }
    this.postDataAnalytics(data);
  }

  /**
   * Обработка товаров при скролле страницы
   * @param productElements Массив HTML элементов товаров
   * @param productList Массив товаров
   */
  async processProducts(productElements:Array<any>, productList:Array<any>) {
    //Отфильтровываем товары попавшие во viewport
    let productsInViewport = productElements.filter((product: HTMLElement) => isInViewport(product));
    
    productsInViewport.forEach(async (product) => {
      //Получаем id из data тега из HTML элемента товара
      let id = product.dataset.id;

      //Проверяем по id товара не было ли отправки запроса 
      if (!this.arrayIdsOfSendProducts.includes(id)) {
        this.arrayIdsOfSendProducts.push(id);
        //Ищем товар по id
        let productById = productList.filter(product => product.id == id);
        
        let secretKey = '';
        //Получаем секретный ключ товара
        await fetch(`/api/getProductSecretKey?id=${id}`)
          .then((res) => res.json())
          .then(key => secretKey = key);

        //Присваиваем тип события в зависимости от наличия свойства log у товара
        let type = Object.keys(productById[0].log).length == 0 ? 'viewCard' : 'viewCardPromo';
        
        //Передаем аналитику при попадании товара во viewport
        if (secretKey) this.eventViewProduct(secretKey, productById[0], type);
      }
    });
  }

  /**
   * Добавление товара в корзину
   * @param props Свойства товара
   */
  async eventAddProductToCart(props:Object) {
    const data = {
      type: 'addToCard',
      payload: {
        props: props,
      },
      timestamp: Date.now(),
    }
    this.postDataAnalytics(data);
  }

  /**
   * Оформление заказа
   * @param orderId ID нового заказа
   * @param totalPrice Итоговая сумма заказа
   * @param productIds Массив с id товаров в корзины
   */
  async eventPlaceAnOrder(orderId:String, totalPrice:Number, productIds:Array<Number>) {
    const data = {
      type: 'purchase',
      payload: {
        orderId: orderId,
        totalPrice: totalPrice,
        productIds: productIds,
      },
      timestamp: Date.now(),
    }
    this.postDataAnalytics(data);
  }

  /**
   * Отправка аналитики
   * @param data Данные для отправки в тело запроса
   */
  async postDataAnalytics(data:Object) {
    await fetch('/api/sendEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data),
    })
    .catch(error => console.log(error))
  }
}

export const analyticsService = new AnalyticsService();