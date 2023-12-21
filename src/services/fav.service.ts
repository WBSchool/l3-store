import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-fav';

class FavService {
  init() {
    this._updCounters();
  }

  async addProduct(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
  }

  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

  async clear() {
    await localforage.removeItem(DB);
    this._updCounters();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DB, data);
    this._updCounters();
  }

  async isInFav(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;

    //@ts-ignore
    document.querySelectorAll('.js__fav-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }
}

export const favService = new FavService();
