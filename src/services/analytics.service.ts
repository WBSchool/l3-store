interface EventPayload {
    [key:string]:any
}

type EventTypes =
    | "route"
    | "viewCard"
    | "viewCardPromo"
    | "addToCart"
    | "purchase";

 interface Event {
    type: EventTypes;
    payload: EventPayload;
    timestamp: Date;
}

class AnalyticsService {
    async sendEvent(type: EventTypes, payload: EventPayload) {
        const obj: Event = {
            type,
            payload,
            timestamp: new Date(),
        };

        try {
            await fetch('/api/sendEvent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export const analyticsService = new AnalyticsService();
