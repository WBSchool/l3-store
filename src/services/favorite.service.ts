import localforage from 'localforage';
import { ProductData } from 'types';

const DBF = '__wb-fav';

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

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DBF)) || [];
  }

  async isInFav(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DBF, data);
    this._updCounters();
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;
    console.log(products.length);

    //@ts-ignore
    document.querySelectorAll('.js__fav-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }
}

export const favoriteService = new FavoriteService();
