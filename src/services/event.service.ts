import { genUUID } from "../utils/helpers";
import { ProductData } from "types";


class EventService {

    async routeEvent() {
        const eventPayload = {
            type: 'route',
            payload: {
            url: window.location.pathname,
            },
            timestamp: Date.now(), 
        };
    
        this.sendEventToServer(eventPayload);
    }

    async sendViewCardEvent(productProperties: ProductData, secretKey: string) {
        const eventPayload = {
          type: productProperties.log ? 'viewCardPromo' : 'viewCard',
          payload: {
            ...productProperties,
            secretKey,
          },
          timestamp: Date.now(),
        };
        this.sendEventToServer(eventPayload);
    }

    async sendAddToCartEvent(productProperties: ProductData) {
        const eventPayload = {
          type: 'addToCart',
          payload: {
            ...productProperties,
          },
          timestamp: Date.now(),
        };
        this.sendEventToServer(eventPayload);
    }

    async sendPurchaseEvent(products: ProductData[]) {
        const orderId = genUUID()
        const totalPrice = products.reduce((acc, product) => (acc += product.salePriceU), 0);
        const productIds =  products.map(product => product.id)
        const eventPayload = {
          type: 'purchase',
          payload: {
            orderId,
            totalPrice,
            productIds,
          },
          timestamp: Date.now(),
        };
        this.sendEventToServer(eventPayload);
      }

    async sendEventToServer(eventPayload: any) {
        fetch('/api/sendEvent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventPayload),
        })
          .then((response) => {
            if (!response.ok) {
              console.error('Ошибка при отправке события на сервер');
            }
          })
          .catch((error) => {
            console.error('Ошибка при отправке события на сервер:', error);
          });
      }
}

export const eventService = new EventService();