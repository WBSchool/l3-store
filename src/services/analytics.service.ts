import { ProductData } from 'types';
import { fetchSecretKey, genUUID } from '../utils/helpers';

type AnalyticObj = {
  type: 'route' | 'viewCard' | 'viewCardPromo' | 'addToCard' | 'purchase';
  payload: {
    [name: string]: any;
  };
  timestamp: number;
};

interface ViewCardAnalyticsPayload extends ProductData {
  secretKey: unknown;
}

interface ViewCardAnalyticsInstance extends AnalyticObj {
  payload: ViewCardAnalyticsPayload;
}

function isEmptyProductLog(product: ProductData) {
  return !Boolean(Object.keys(product.log).length)
}

class Analytics {
  private _viewCardAnalyticsStorage: ViewCardAnalyticsInstance[];
  private _sendViewCardAnalyticsTimeout: undefined | NodeJS.Timeout;

  constructor() {
    this._viewCardAnalyticsStorage = [];
    this._sendViewCardAnalyticsTimeout = undefined;
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

  async sendViewCardAnalytic(product: ProductData) {
    const secretKey = await fetchSecretKey(product.id);
    const analyticObj: AnalyticObj = {
      type: isEmptyProductLog(product) ? 'viewCard' : 'viewCardPromo',
      payload: {
        ...product,
        secretKey
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(analyticObj) });
  }

  // Альтарнативный вараинт отправки аналитики
  // попадания каторчки товара во вьюпорт - массивом
  async sendViewCardArrayAnalytic(product: ProductData) {
    const secretKey = await fetchSecretKey(product.id);
    this._viewCardAnalyticsStorage.push({
      type: isEmptyProductLog(product) ? 'viewCard' : 'viewCardPromo',
      payload: {
        ...product,
        secretKey
      },
      timestamp: Date.now()
    });

    clearTimeout(this._sendViewCardAnalyticsTimeout);
    this._sendViewCardAnalyticsTimeout = setTimeout(() => {
      fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(this._viewCardAnalyticsStorage) });
      this._viewCardAnalyticsStorage = [];
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
