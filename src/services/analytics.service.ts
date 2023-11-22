class AnalyticsService {
  async sendRouteUrl(url: any) {
    const eventData = {
      type: 'route',
      payload: { url },
      timestamp: Date.now()
    };
    this.sentEvent(eventData);
  }
  async sendProductViewport(dataProduct: any, secretKey: any) {
    let typeProduct: string;
    if (Object.keys(dataProduct.log).length > 0) {
      typeProduct = 'viewCardPromo';
    } else {
      typeProduct = 'viewCard';
    }
    const eventData = {
      type: typeProduct,
      payload: { secretKey, dataProduct },
      timestamp: Date.now()
    };
    this.sentEvent(eventData);
  }

  async sendAddToCart(dataProduct: any) {
    const eventData = {
      type: 'addToCard',
      payload: dataProduct,
      timestamp: Date.now()
    };
    this.sentEvent(eventData);
  }

  async sendMakeOrder(data: any) {
    console.log(data);
    const eventData = {
      type: 'purchase',
      payload: data,
      timestamp: Date.now()
    };
    this.sentEvent(eventData);
  }

  async sentEvent(eventData: any) {
    await fetch('/api/sendEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    });
  }
}
export const analyticsService = new AnalyticsService();
