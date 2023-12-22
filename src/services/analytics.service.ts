import { ProductData } from 'types';
import { fetchSecretKey, genUUID } from '../utils/helpers';

type AnalyticObj = {
  type: 'route' | 'viewCard' | 'viewCardPromo' | 'addToCard' | 'purchase';
  payload: {
    [name: string]: any;
  };
  timestamp: number;
};

class Analytics {
  sendRouteAnalytic(url: string) {
    const obj: AnalyticObj = {
      type: 'route',
      payload: {
        url
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
  }

  // Вот к этому блоку вопросы...
  getViewCardAnalytics() {
    interface rawData {
      product: ProductData;
      timestamp: number;
    }

    let rawData: rawData[] = [];
    let timeout: undefined | NodeJS.Timeout = undefined;

    return (product: ProductData) => {
      rawData.push({
        product: product,
        timestamp: Date.now()
      });

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        let productsToPush = [...rawData];
        rawData = [];
        productsToPush.forEach(async (El) => {
          const secretKey = await fetchSecretKey(El.product.id);
          const obj: AnalyticObj = {
            type: El.product.log ? 'viewCardPromo' : 'viewCard',
            payload: {
              ...El.product,
              secretKey
            },
            timestamp: Date.now()
          };
          fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
        });
      }, 2000);
    };
  }

  sendAddToCartAnalytic(Product: ProductData) {
    const obj: AnalyticObj = {
      type: 'addToCard',
      payload: {
        ...Product
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
  }

  sendPurchaseAnalytic(products: ProductData[]) {
    const obj: AnalyticObj = {
      type: 'purchase',
      payload: {
        orderID: genUUID(),
        totalPrice: products.reduce((Sum, Prod) => (Sum += Prod.salePriceU), 0),
        productIds: products.map((Prod) => Prod.id)
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
  }
}

export const sendAnalytic = new Analytics();
