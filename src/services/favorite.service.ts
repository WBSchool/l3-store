import localforage from 'localforage';
import { ProductData } from 'types';

const LIKED_DB = '__wb-favorite';

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

  async clear() {
    await localforage.removeItem(LIKED_DB);
    this._updCounters();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(LIKED_DB)) || [];
  }
  async set(data: ProductData[]) {
    await localforage.setItem(LIKED_DB, data);
    this._updCounters();
  }

  async isInLiked(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
   }
   
  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;
    const linkFavorite = document.querySelector('.favorite-link');
    if (count === 0) {      
      linkFavorite?.classList.add('display-none');
    }
    else {
      linkFavorite?.classList.remove('display-none');
    }
    //@ts-ignore
    document.querySelectorAll('.js__favorite-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }
}

export const favoriteService = new FavoriteService();