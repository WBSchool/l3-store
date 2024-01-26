import localforage from 'localforage';
import { ProductData } from 'types';

const WBF = '__wb-favorite';

class FavoriteService {
  init() {
    this._showFavorites();
    this._hideFavorites();
  }

  async addProductFavorite(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
    this._showFavorites();
  }

  async removeProductFavorite(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
    this._hideFavorites();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(WBF)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(WBF, data);
  }

  async isInFavorite(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _showFavorites() {
    const products = await this.get();
    if (products.length > 0) {
      document.querySelector('.favorite')?.classList.remove('hide');
    }
  }
  private async _hideFavorites() {
    const products = await this.get();
    if (products.length == 0) {
      document.querySelector('.favorite')?.classList.add('hide');
    }
  }
}

export const favoriteService = new FavoriteService();
