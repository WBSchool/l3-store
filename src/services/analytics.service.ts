import { ProductData } from 'types';

type AnalyticObj = {
  type: 'route' | 'viewCard' | 'addToCard' | 'purchase';
  payload: {
    [name: string]: any;
  };
  timestamp: number;
};

export const sendAnalytic = {
  Route(url: string) {
    const obj: AnalyticObj = {
      type: 'route',
      payload: {
        url
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
  },

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
  },

  AddToCart(Product: ProductData) {
    const obj: AnalyticObj = {
      type: 'addToCard',
      payload: {
        ...Product
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
  },

  Purchase(orderID: number, totalPrice: number, productIds: number[]) {
    const obj: AnalyticObj = {
      type: 'addToCard',
      payload: {
        orderID,
        totalPrice,
        productIds
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
  }
};
