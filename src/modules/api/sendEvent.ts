interface EventPayload {
  [key: string]: any;
}

interface Event {
  type: string;
  payload: EventPayload;
  timestamp: number;
}

class EventSender {
  sendEvent(type: string, payload: EventPayload): void {
    const event: Event = {
      type,
      payload,
      timestamp: Date.now(),
    };

    fetch('/api/sendEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при отправке события');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

class EventHandler {
  eventSender: EventSender;

  constructor() {
    this.eventSender = new EventSender();
  }

  handlePageChange(url: string): void {
    this.eventSender.sendEvent('route', { url });
    console.log(url);
  }

  handleViewCard(card: EventPayload): void {
    const eventType = card.log ? 'viewCardPromo' : 'viewCard';
    console.log(card);
    this.eventSender.sendEvent(eventType, card);
  }

  handleAddToCart(product: EventPayload): void {
    this.eventSender.sendEvent('addToCart', product);
    console.log(product)
  }

  handlePurchase(orderId: string, totalPrice: number, productIds: number[]): void {
    const payload = {
      orderId,
      totalPrice,
      productIds,
    };
    this.eventSender.sendEvent('purchase', payload);
    console.log(payload);
  }
}

export const eventHandler = new EventHandler();
