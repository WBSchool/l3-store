import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorites';
type ID = ProductData['id'];

class FavoritesService {
  init() {
    this._updCounters();
  }

  async get(): Promise<ID[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async changeProduct(productID: ID) {
    const isProdFavorite = await this.isFavorite(productID);
    isProdFavorite ? this.removeProduct(productID) : this.addProduct(productID);
    return !isProdFavorite;
  }

  async addProduct(productID: ID) {
    const products = await this.get();
    await this.set([...products, productID]);
  }

  async removeProduct(targetID: ID) {
    const products = await this.get();
    await this.set(products.filter((ProductID) => targetID !== ProductID));
  }

  async clear() {
    await localforage.removeItem(DB);
    this._updCounters();
  }

  async set(data: ID[]) {
    await localforage.setItem(DB, data);
    this._updCounters();
  }

  async isFavorite(ID: ID) {
    const products = await this.get();
    return products.includes(ID);
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;

    //@ts-ignore
    const Elements = document.querySelectorAll('.js__favorites-counter') as HTMLElement[];

    Elements.forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }
}

export const favoritesService = new FavoritesService();