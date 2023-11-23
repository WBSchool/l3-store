import { ProductData } from 'types';

type eventSendType = {
  type: EventType;
  payload: object;
  timestamp?: number;
};

enum EventType {
  Route = 'route',
  ViewCard = 'viewCard',
  AddToCard = 'addToCard',
  Purchase = 'purchase',
  ViewCardPromo = 'viewCardPromo'
}

class StatisticsService {
  async routeEvent(url: string) {
    const eventSend: eventSendType = {
      type: EventType.Route,
      payload: { url }
    };

    this._sendStatistic(eventSend);
  }

  async viewCardEvent(product: ProductData, secretKey: string) {
    const eventSend: eventSendType = {
      type: Object.entries(product.log).length === 0 ? EventType.ViewCard : EventType.ViewCardPromo,
      payload: {
        ...product,
        secretKey
      }
    };
    this._sendStatistic(eventSend);
  }

  async addtoCardEvent(product: ProductData) {
    const eventSend: eventSendType = {
      type: EventType.AddToCard,
      payload: {
        ...product
      }
    };

    this._sendStatistic(eventSend);
  }

  async PurchaseEvent(products: ProductData[]) {
    const eventSend: eventSendType = {
      type: EventType.AddToCard,
      payload: products
    };
    this._sendStatistic(eventSend);
  }

  private async _sendStatistic(eventSend: eventSendType) {
    fetch('/api/sendEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventSend)
    })
      .then((response) => {
        if (response.ok) {
          return response;
        }
        const { statusText, status } = response;
        throw new Error(`${status}-${statusText}`);
      })
      .catch((error) => console.error(error));
  }
}

export const statisticsService = new StatisticsService();
