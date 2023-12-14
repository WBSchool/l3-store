import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorite';

class FavoriteService {
  init() {
    this._updCounters();
  }

  async addFavorite(favoriteProduct: ProductData) {
    const favoriteProducts = await this.get();
    await this.set([...favoriteProducts, favoriteProduct]);
  }

  async removeFavorite(favoriteProduct: ProductData) {
    const favoriteProducts = await this.get();
    await this.set(favoriteProducts.filter(({ id }) => id !== favoriteProduct.id));
    this._updCounters();
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

  async isFavorite(favoriteProduct: ProductData) {
    const favoriteProducts = await this.get();
    return favoriteProducts.some(({ id }) => id === favoriteProduct.id);
  }

  private async _updCounters() {
    const favoriteProducts = await this.get();
    const count = favoriteProducts.length >= 10 ? '9+' : favoriteProducts.length;

    document
      .querySelectorAll('.js__favorite-counter')
      //@ts-ignore
      .forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));

    if (favoriteProducts.length > 0) {
      document.querySelectorAll('.favorite').forEach(($el) => {
        ($el as HTMLElement).classList.remove('hide');
      });
    } else {
      document.querySelectorAll('.favorite').forEach(($el) => {
        ($el as HTMLElement).classList.add('hide');
      });
    }
  }
}

export const favoriteService = new FavoriteService();
