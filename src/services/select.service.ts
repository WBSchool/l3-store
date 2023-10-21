import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-select';

class SelectService {
  init() {
    this._updCounters();
    this._checkSelectLink();
  }

  async toggleProduct(product: ProductData) {
    const isProductSelected = await this.isInSelect(product)
    if(!isProductSelected) {
      await this.addProduct(product)
    } else {
      await this.removeProduct(product)
    }
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
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DB, data);
    this._updCounters();
    this._checkSelectLink();
  }

  async isInSelect(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;

    //@ts-ignore
    document.querySelectorAll('.js__select-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }

  private async _checkSelectLink() {
    const products = await this.get();
    const selectLink = document.querySelector('.select')
    if (products.length < 1) {
      if(!selectLink?.classList.contains('hide')) {
        selectLink?.classList.add('hide')
      }
    } else {
      if(selectLink?.classList.contains('hide')) {
        selectLink?.classList.remove('hide')
      }
    }
  }
}

export const selectService = new SelectService();