import {HTMLWithProductData, ProductData} from '../../types';

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

    async handleIntersections(entries: IntersectionObserverEntry[]) {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                console.log('Intersected:', entry.target);
                const {productData} = entry.target as HTMLWithProductData;

                console.log(`Product ID: ${productData.id}. Getting secret key ...`);
                const secretKey: string = await this.getSecretKey(productData.id);

                const isLogEmpty: boolean = Object.keys(productData.log).length === 0;
                const body: Analytics = {
                    type: isLogEmpty ? 'viewCard' : 'viewCardPromo',
                    payload: {productData, secretKey},
                    timestamp: Date.now()
                }

                console.log(`Product ID: ${productData.id}. Sending analytics...`);
                this.sendAnalytics(body);
            }
        }
    }

    async getSecretKey(id: number): Promise<string> {
        return await fetch(`/api/getProductSecretKey?id=${id}`).then((res) => res.json());
    }

    async sendAnalytics(body: Analytics): Promise<void> {
        console.log('analytics for send:', body);

        fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(response => response.json()).then(json => console.log('analytics response:', json));
    }
}

export const analyticsService = new AnalyticsService();