class Api {

    _response(res: any) {
        if (res.ok) {
            return res.json()
        } 
        return Promise.reject(`${res.status}`)
    }

    sendEvent(type: string, payload: any) {
        return fetch('/api/sendEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                type: type, 
	            payload: payload,
	            timestamp: new Date()
            })
        })
        .then(this._response)
    }
}

const api = new Api();

export default api;