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
    isProdFavorite ? await this.removeProduct(productID) : await this.addProduct(productID);
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
    const Counters = document.querySelectorAll('.js__favorites-counter') as HTMLElement[];
    //@ts-ignore
    const Links = document.querySelectorAll('#favorite_link') as HTMLElement[];

    const productsCount = products.length;
    Links.forEach(($el: HTMLElement) => ($el.style.display = productsCount ? 'flex' : 'none'));
    Counters.forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }
}

export const favoritesService = new FavoritesService();
