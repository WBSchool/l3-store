import { ProductData, statPayload } from "types";
import { genUUID } from "../utils/helpers";

class StatService {

  async sendStat (type: string, payload: statPayload) {
    console.log({type, payload, timestamp: Date.now()}); // Выведение данных в консоль для удобства проверки
    await fetch('/api/sendEvent', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({type, payload, timestamp: Date.now()}),
    }).then((response) => {
      if (!response.ok) {
        console.log('Ошибка отправки');
      }
    }).catch((e) => {
        console.log(`Ошибка - ${e}`);
    })
  }

  async sendRouteStat (url: string) {
    const type = 'route';
    const payload = {
      url
    }
    this.sendStat(type, payload);
  }

  async sendAddToCartStat (product: ProductData) {
    const type = 'addToCart';
    const payload = {
      productDetails: product,
    };
      this.sendStat(type, payload);
  }  
  
  async sendCheckoutStat (products: ProductData[]) {
    const orderId = genUUID();
    const productsIds = products.map((product) => product.id);
    let totalPrice = 0;
    products.forEach((product) => totalPrice += product.salePriceU);

    const type = 'purchase';
    const payload =  {
      orderId,
      totalPrice,
      productsIds,
    };
      this.sendStat(type, payload); 
    }

    async sendViewportStat (product: ProductData) {
      const type = Object.keys(product.log).length > 0 ? 'viewCardPromo' : 'viewCard';
      const payload = {
        productDetails: product,
      };
        this.sendStat(type, payload);
      }  
}

export const statService = new StatService();