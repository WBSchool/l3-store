import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorite';

class FavoriteService {
  init() {
    this._updCounters();
    this.updateFavoriteButton();
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
    this.updateFavoriteButton();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DB, data);
    this._updCounters();
    this.updateFavoriteButton();
  }

  async isInFavorite(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;

    //@ts-ignore
    document.querySelectorAll('.js__favorites-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }

  async updateFavoriteButton() {
    const favoriteButton = document.querySelector('.favorites');
    const products = await this.get();
    if (products.length >= 1) {
      favoriteButton?.classList.remove('hidden');
    }
  }
}

export const favoriteService = new FavoriteService();
