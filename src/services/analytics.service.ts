class AnalyticsService {
  async sendRouteUrl(url: any) {
    const eventData = {
      type: 'route',
      payload: { url },
      timestamp: Date.now()
    };
    this.sentEvent(eventData);
  }
  async sendProductViewport(dataProduct: any) {
    const eventData = {
      type: 'viewCard',
      payload: {dataProduct },
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
    })
  }
}
export const analyticsService = new AnalyticsService();
