import { ProductData, statData } from "types";
import { genUUID } from "../utils/helpers";

class StatService {

  async sendStat (data: statData) {
    console.log(data); // Выведение данных в консоль для удобства проверки
    await fetch('/api/sendEvent', {
      
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then((response) => {
      if (!response.ok) {
        console.log('Ошибка отправки');
      }
    }).catch((e) => {
        console.log(`Ошибка - ${e}`);
    })

  }

  async sendRouteStat (url: string) {

    const data = {
      type: 'route',
      payload: {
        url,
      },
      timestamp: Date.now(),
    }

    this.sendStat(data);
  }

  async sendAddToCartStat (product: ProductData) {

    const data = {
      type: 'addToCart',
      payload: {
        productDetails: product,
      },
      timestamp: Date.now(),
    }

    this.sendStat(data);
  }

  async sendCheckoutStat (products: ProductData[]) {
    
    const orderId = genUUID();
    const productsIds = products.map((product) => product.id);

    let totalPrice = 0;
    products.forEach((product) => totalPrice += product.salePriceU);

    const data = {
      type: 'purchase',
      payload: {
        orderId,
        totalPrice,
        productsIds,
      },
      timestamp: Date.now(),
    }

    this.sendStat(data);
  }

  async sendViewportStat (product: ProductData, secretKey: string, timestamp: number) {
    
    const type = Object.keys(product.log).length > 0 ? 'viewCardPromo' : 'viewCard';

    const data = {
      type,
      payload: {
        productDetails: product,
        secretKey,
      },
      timestamp,
    }

    this.sendStat(data);
  }
}

export const statService = new StatService();