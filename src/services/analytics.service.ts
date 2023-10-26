import { ProductData } from '../../types';

enum EventTypes {
    route = 'route',
    viewCard = 'viewCard',
    viewCardPromo = 'viewCardPromo',
    addToCard = 'addToCard',
    purchase = 'purchase'
}

type Payload = {url: string}
    | {productData: ProductData, secretKey: string}
    | {productData: ProductData}
    | {orderId: string, totalPrice: number, productIds: number[]}


interface Analytics {
    type: keyof typeof EventTypes;
    payload: Payload;
    timestamp: number;
}

class AnalyticsService {
    url: string;

    constructor(url: string = '/api/sendEvent') {
        this.url = url;

    }

    async sendAnalytics(body: Analytics) {
        console.log('analytics:', body);

        fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(response => response.json()).then(json => console.log('analytics:', json));
    }
}

export const analyticsService = new AnalyticsService();