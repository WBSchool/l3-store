import { ProductData } from 'types';

class AnalyticService {
  async routerPage(href: string) {
    const data = {
      type: 'route',
      payload: {
        href
      },
      timestamp: Date.now()
    };
    this.sendData(data);
  }

  async showProduct(productData: ProductData, secretKey: number) {
    const productType = Object.entries(productData.log).length > 0 ? 'viewCardPromo' : 'viewCard';

    const data = {
      type: productType,
      payload: {
        productData,
        secretKey
      },
      timestamp: Date.now()
    };
    this.sendData(data);
  }
  async addtoCart(productData: ProductData) {
    const data = {
      type: 'AddtoCart',
      payload: {
        productData
      },
      timestamp: Date.now()
    };
    this.sendData(data);
  }
  async placeOrder(products: ProductData[]) {
    const orderId = 'd4sa5ds5a65sd8dw84d6as';
    const totalPrice = products.reduce((acc, product) => acc + product.salePriceU, 0);
    const productIds = products.reduce<Number[]>((acc, product) => {
      acc.push(product.id);
      return acc;
    }, []);

    const data = {
      type: 'purchase',
      payload: {
        orderId,
        totalPrice,
        productIds
      },
      timestamp: Date.now()
    };
    this.sendData(data);
  }

  async sendData(data: object) {
    await fetch('/api/sendEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    }).catch((err) => console.log(err));
  }
}

export const analyticService = new AnalyticService();
