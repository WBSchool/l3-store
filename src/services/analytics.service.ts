type AnalyticObj = {
  type: 'route' | 'viewCard' | 'addToCard' | 'purchase';
  payload: {
    [name: string]: any;
  };
  timestamp: number;
};

export const sendAnalytic = {
  Route(url: string) {
    const obj: AnalyticObj = {
      type: 'route',
      payload: {
        url
      },
      timestamp: Date.now()
    };
    fetch('/api/sendEvent', { method: 'POST', body: JSON.stringify(obj) });
  }
};
