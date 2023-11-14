class StatisticsService {
   async send(type: string, payload: any): Promise<void> {
    const body = {
        type,
        payload
      }
      
    const result = fetch('/api/sendEvent', { body: JSON.stringify(body), method: "POST" })
        .then(res => res.json())
        .then(date => console.log(`${type}: `, date))
        .catch(error => console.error(error));
    return result;
  }
}

export const statisticsService = new StatisticsService();