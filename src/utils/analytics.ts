export const sendEvent = (type: string, payload: any) => {
    const event = {
        type,
        payload: JSON.stringify(payload),
        timestamp: Date.now().toString()
     };
  
    const queryParams = new URLSearchParams(event).toString();
    fetch(`/api/sendEvent?${queryParams}`);
}