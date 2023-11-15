import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-cart';
const LB = '__wb-favorite';

class CartService {
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

  addFavorite(product: ProductData) {
    const products = this.getFavorites();
    this.setFavorites([...products, product]);
  }

  removeFavorite(id: ProductData["id"]) {
    const products = this.getFavorites();
    const newValueProducts = products.filter(item => item.id !== id);
    this.setFavorites(newValueProducts);
  }

  async clear() {
    await localforage.removeItem(DB);
    this._updCounters();
  }

  async get(): Promise<ProductData[]> {
    return (await localforage.getItem(DB)) || [];
  }

  getFavorites(): ProductData[] {
    let products = localStorage.getItem(LB);
    return products ? JSON.parse(products) : [];
  }

  isInFavorites(id: ProductData["id"] ): boolean {
    let products = localStorage.getItem(LB);
    if (!products) return false;
    products = JSON.parse(products);
    const itemsFavorite = JSON.parse(localStorage.getItem(LB) || '');
    if (!itemsFavorite) return false;
    const [item] = itemsFavorite.filter((item: ProductData) => item.id === id );
    return item ? true : false;
  }

  async set(data: ProductData[]) {
    await localforage.setItem(DB, data);
    this._updCounters();
  }

  setFavorites(data: ProductData[]) {
    localStorage.setItem(LB, JSON.stringify(data));
    this._updCountersFavorites();
  }

  async isInCart(product: ProductData) {
    const products = await this.get();
    return products.some(({ id }) => id === product.id);
  }

  private async _updCounters() {
    const products = await this.get();
    const count = products.length >= 10 ? '9+' : products.length;

    const favoriteProducts = this.getFavorites();
    const countFavorite = favoriteProducts.length >= 10 ? '9+' : favoriteProducts.length;


    //@ts-ignore
    document.querySelectorAll('.js__cart-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
    //@ts-ignore
    document.querySelectorAll('.js__favorite-counter').forEach(($el: HTMLElement) => ($el.innerText = String(countFavorite || '')));
  }

  private _updCountersFavorites() {
    const products = this.getFavorites();
    const count = products.length >= 10 ? '9+' : products.length;

    //@ts-ignore
    document.querySelectorAll('.js__favorite-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
  }
}

export const cartService = new CartService();
