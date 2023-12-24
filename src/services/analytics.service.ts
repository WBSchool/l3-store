import { ProductData } from 'types';
import { fetchSecretKey, genUUID } from '../utils/helpers';

type AnalyticObj = {
  type: 'route' | 'viewCard' | 'viewCardPromo' | 'addToCard' | 'purchase';
  payload: {
    [name: string]: any;
  };
  timestamp: number;
};

interface ViewCardAnalyticsInstance {
  product: ProductData;
  timestamp: number;
}

class Analytics {
  viewCardAnalyticsStorage: ViewCardAnalyticsInstance[];
  timeout: undefined | NodeJS.Timeout;

  constructor() {
    this.viewCardAnalyticsStorage = [];
    this.timeout = undefined;
  }

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

  sendviewCardAnalytic(product: ProductData) {
    this.viewCardAnalyticsStorage.push({
      product: product,
      timestamp: Date.now()
    });

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let productsToPush = [...this.viewCardAnalyticsStorage];
      this.viewCardAnalyticsStorage = [];
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
