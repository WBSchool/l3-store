import localforage from 'localforage';
import { ProductData } from 'types';

const FAV = '_wb-favorite';

class FavoriteService {
  init() {
    this._showFavorite();
  }
  
  // добавить товар в избранное
  async addProductToFavorite(product: ProductData) {
    const products = await this.get();
    await this.set([...products, product]);
    this._showFavorite();
  }

  // удалить товар из Избранных
  async removeProduct(product: ProductData) {
    const products = await this.get();
    await this.set(products.filter(({ id }) => id !== product.id));
  }

  //получить товары, добавленные в избранное
  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(FAV)) || [];
  }

  // добавить в localforage товар в избранное
  async set(data: ProductData[]) {
    await localforage.setItem(FAV, data);
  }

  //проверка наличия товара в избранных
  async isInFavorite(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _showFavorite() {
    const products = await this.get();

    if (products.length > 0) {
      document.querySelector('.fav')!.classList.remove('hide');
    }
  }
}

export const favoriteService = new FavoriteService();
