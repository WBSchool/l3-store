import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorite';

class FavoriteService {
  init() {}

  async addProduct(product: ProductData) {
    const products = await this.get();
    console.log(products);
    await this.set([...products, product]);
  }

  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

  async clear() {
    await localforage.removeItem(DB);
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DB, data);
  }

  async isInFav(product: ProductData) {
    const products = await this.get();
    console.log(products);
    return products.some(({ id }) => id === product.id);
  }

  async updateUI(isAdd: boolean) {
    const heartSvg = document.querySelector('.svg-icon');
    if (isAdd) {
      heartSvg?.classList.remove('fill');
    } else {
      heartSvg?.classList.add('fill');
    }
  }
}

export const favoriteService = new FavoriteService();
