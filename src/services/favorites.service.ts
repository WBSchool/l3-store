import localforage from "localforage";
import {ProductData} from "types";

const DB = '__wb-favorites';

class FavoritesService {

    init() {
      this.getFavs();
    }

    async addProduct(product: ProductData) {
        const products = await this.get();
        await this.set([...products, product]);
        location.reload();
    }

    async removeProduct(product: ProductData) {
        const products = await this.get();
        await this.set(products.filter(({id}) => id !== product.id));
    }

    async get(): Promise<ProductData[]> {
        return (await localforage.getItem(DB)) || [];
    }

    async set(data: ProductData[]) {
        await localforage.setItem(DB, data);
    }
    async getFavs() {
        const a = document.querySelector('.favorites-a') as HTMLElement
        try {
            const val = await this.get();
            if (val.length < 1) {
                a.style.display = 'none';
            } else {
                a.style.display = 'flex-box';
            }

        } catch (e) {
            console.log(e, 'error');
        }
    }
}

export const favoritesService = new FavoritesService();
