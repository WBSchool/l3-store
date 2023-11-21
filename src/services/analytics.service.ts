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
    //console.log(secretKey,' - ',dataProduct);
    let typeProduct: string;
    if (Object.keys(dataProduct.log).length > 0) {
      typeProduct = 'viewCardPromo';
    } else {
      typeProduct = 'viewCard';
    }
    const eventData = {
      type: typeProduct,
      payload: {secretKey, dataProduct },
      timestamp: Date.now()
      };
    console.log(eventData);
    this.sentEvent(eventData);
  }

  async sentEvent(eventData: any) {
    await fetch('/api/sendEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
  }
}
export const analyticsService = new AnalyticsService();
