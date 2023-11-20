import localforage from 'localforage';
import { ProductData } from 'types';

const FAV_DB = '__wb-favorite';

class FavoriteService {
  
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

  async isInFavorite(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  async set(data: ProductData[]) {
    await localforage.setItem(FAV_DB, data);
    this._updCounters();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(FAV_DB)) || [];
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;
    const linkClasses = products.length === 0 ? 'favorite hide' : 'favorite';

      //@ts-ignore
    document.querySelectorAll('.js__favorite-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
    document.querySelector('.favorite')!.className = String(linkClasses);  
  }
}

export const favoriteService = new FavoriteService();