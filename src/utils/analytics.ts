export const analyticsService = async (type: string, payload: any) => {
    const analytics = {
        type: type,
        payload: payload,
        timestamp: new Date().getTime(),
    }

    await fetch('/api/sendEvent', {
        method: 'POST',
        body: JSON.stringify(analytics)
    });

    console.log(analytics);
    
}