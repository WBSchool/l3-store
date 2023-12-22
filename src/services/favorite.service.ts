import localforage from 'localforage';
import { ProductData } from 'types';

const FAV_DB = '__wb-favorite';

class FavoriteService {
  
  init() {
    this._updLink();
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
    this._updLink();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(FAV_DB)) || [];
  }

  private async _updLink() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;
      //@ts-ignore
    document.querySelectorAll('.js__favorite-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
    document.querySelectorAll('.js__favorite-link').forEach(($el) => {
      if (products.length > 0) {
        $el.classList.remove('hide');
      } else {
        $el.classList.add('hide');
      }
    });
     
  }
}

export const favoriteService = new FavoriteService();