class EventService{
   event!: {
      type: string,
      playload: any,
      timestamp: number
   }

   _createEvent(type: string, playload: any){
       return this.event = {
         type,
         playload,
         timestamp: new Date().getTime()
      }
   }

   async sendEvent (type: string, playload: any){
      const event = this._createEvent(type, playload)
      await fetch('/api/sendEvent', {
         method: 'POST',
         body: JSON.stringify(event)
      })
   }
}

export const eventService = new EventService()