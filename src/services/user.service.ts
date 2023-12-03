import localforage from 'localforage';
import { genUUID } from '../utils/helpers';

const ID_DB = '__wb-userId';

class UserService {
  async init() {
    const id = await this.getId();
    console.warn('UserID: ', id);
  }

  async getId(): Promise<string> {
    let id = await localforage.getItem(ID_DB) as string;

    if (!id) id = await this._setId();

    return id;
  }

  private async _setId(): Promise<string> {
    const id = genUUID();
    await localforage.setItem(ID_DB, id);
    return id;
  }

  async sendingEventStatistics<T>(eventType: string, payload: T): Promise<void> {
    const data = {
      type: eventType,
      payload,
      timestamp: Math.round(new Date().getTime() / 1000)
    }

    fetch('/api/sendEvent', {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const userService = new UserService();