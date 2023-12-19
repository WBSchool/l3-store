import { ProductData } from 'types';
import { genUUID } from '../utils/helpers';

type AnalyticObj = {
  type: 'route' | 'viewCard' | 'addToCard' | 'purchase';
  payload: {
    [name: string]: any;
  };
  timestamp: number;
};

class Analytics {
  Route(url: string) {
    const obj: AnalyticObj = {
      type: 'route',
      payload: {
        url
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
  }

  ViewCard(Product: ProductData, secretKey: string) {
    const obj: AnalyticObj = {
      type: 'viewCard',
      payload: {
        ...Product,
        secretKey
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
  }

  AddToCart(Product: ProductData) {
    const obj: AnalyticObj = {
      type: 'addToCard',
      payload: {
        ...Product
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
  }

  Purchase(products: ProductData[]) {
    const orderID = genUUID();
    const totalPrice = products.reduce((Sum, Prod) => (Sum += Prod.salePriceU), 0);
    const productIds = products.map((Prod) => Prod.id);
    const obj: AnalyticObj = {
      type: 'purchase',
      payload: {
        orderID,
        totalPrice,
        productIds
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
  }
}

export const sendAnalytic = new Analytics();
