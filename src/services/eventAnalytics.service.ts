import { Analytics } from 'types';

class EventAnalyticsService {
    url: string; //URL, Куда будет отправлен JSON 

    constructor(url: string = '/api/sendEvent') {
        this.url = url;
    }

    //Функция отправки JSON 
    sendEvent(body: Analytics) {
        fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    }
}

export const eventAnalyticsService = new EventAnalyticsService();
