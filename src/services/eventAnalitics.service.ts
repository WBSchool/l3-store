import { formatPrice, genUUID, isElementInViewport } from '../utils/helpers';
import { ProductData } from 'types';

class EventAnaliticService {

  async routePages(href: string) {
    const data = {
      type: 'route',
      payload: {
        url: href
      },
      timestamp: Date.now()
    };

    this.sendData(data);
  }

  async addToCart(product: ProductData) {
    const data = {
      type: 'addToCart',
      payload: {
        product: product
      },
      timestamp: Date.now()
    };

    this.sendData(data);
  }

  async veiwCard(product: ProductData, secretKey: string) {
    const type = Object.keys(product.log).length > 0 ? 'viewCardPromo' : 'viewCard';

    const data = {
      type: type,
      payload: {
        product: product,
        secretKey: secretKey
      },
      timestamp: Date.now()
    };

    this.sendData(data);
  }

  async sendProductsInView(productsHTMLElements: any[], products: ProductData[]){
    let productsHTMLElementsInViewport = productsHTMLElements.filter((product: HTMLElement) => isElementInViewport(product));

    let productIds = productsHTMLElementsInViewport.map(productsHTMLElement => productsHTMLElement.dataset.id);

    let filtredProducts = products.filter(product => {
      let searchProductId = product.id;

      let findProductId = productIds.find(productId => productId === String(searchProductId));

      return findProductId !== undefined;
    });

    filtredProducts.forEach(product => {
      this.veiwCard(product, String(product.id));
    });
  }

  async sendOrder(products: ProductData[]) {

    const orderId = genUUID();
    const productIds = products.map((product) => product.id);
    let totalPrice = 0;
    products.forEach((product) => totalPrice += product.salePriceU);
    
    const data = {
      type: 'purchase',
      payload: {
        orderId,
        totalPrice: Math.round(totalPrice / 1000),
        productIds
      },
      timestamp: Date.now()
    };
    this.sendData(data);
  }

  async sendData(data: Object) {
    await fetch('/api/sendEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }).catch((err) => console.log(err));
  }
}

export const eventAnaliticsService = new EventAnaliticService();