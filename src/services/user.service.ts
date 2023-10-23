import localforage from 'localforage';
import { genUUID } from '../utils/helpers';

const ID_DB = '__wb-userId';

class UserService {
  private userId: string | undefined;

  async init() {
    const id = await this.getId();
    this.userId = id;
    console.warn('UserID: ', id);
  }

  async getId(): Promise<string> {
    if (this.userId) {
      return this.userId;
    }

    let id = await localforage.getItem(ID_DB) as string;

    if (!id) id = await this._setId();

    return id;
  }

  private async _setId(): Promise<string> {
    const id = genUUID();
    await localforage.setItem(ID_DB, id);
    return id;
  }
}

export const userService = new UserService();
