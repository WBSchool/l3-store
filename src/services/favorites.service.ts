import localforage from "localforage";
import {ProductData} from "types";

const DB = '__wb-favorites';

class FavoritesService {

    init() {
      this.getFavs();
      this._updCounters();
    }

    async addProduct(product: ProductData) {
        const products = await this.get();
        await this.set([...products, product]);
        location.reload()
    }

    async removeProduct(product: ProductData) {
        const products = await this.get();
        await this.set(products.filter(({id}) => id !== product.id));
        if(products.length === 1) {
            location.reload();
        }
    }

    async get(): Promise<ProductData[]> {
        return (await localforage.getItem(DB)) || [];
    }

    async set(data: ProductData[]) {
        await localforage.setItem(DB, data);
        this._updCounters();
    }
    private async _updCounters() {
        const products = await this.get();
        const count = products.length >= 10 ? '9+' : products.length;

        //@ts-ignore
        document.querySelectorAll('.js__favorites-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
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
