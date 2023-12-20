import localforage from 'localforage';
import { ProductData } from 'types';

const FAVORITES_DB = '__wb-favorites';

class FavoritesService {
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
    await localforage.removeItem(FAVORITES_DB);
    this._updCounters();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(FAVORITES_DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(FAVORITES_DB, data);
    this._updCounters();
  }

  async isInFavorites(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;

    const favoritesLink = document.querySelector('.favorites') as HTMLElement | null;

    if (count > 0) {
      //@ts-ignore
      favoritesLink.style.display = 'block';
    } else {
      //@ts-ignore
      favoritesLink.style.display = 'none';
    }

    //@ts-ignore
    document.querySelectorAll('.js__favorites-counter').forEach((element: Element) => {
      const $el = element as HTMLElement | null;
      if ($el) {
        $el.innerText = String(count || '');
      }
    });
  }
}

export const favoritesService = new FavoritesService();
