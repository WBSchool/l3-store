type Event = { 
    type: typeEvent, 
	payload: Object, 
	timestamp: number,
};

export const enum typeEvent {
    route = 'route',
    viewCard = 'viewCard',
    viewCardPromo = 'viewCardPromo',
    addToCard = 'addToCard',
    purchase = 'purchase',
}

class EventAnalytics {
    url: string;

    constructor() {
        this.url = '/api/sendEvent';
    }

    async sendEvent(event: Event) {
        console.log(event);

        await fetch(this.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(event),
        });
    }
}

export const eventAnalytics = new EventAnalytics();
