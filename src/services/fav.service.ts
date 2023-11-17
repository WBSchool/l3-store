import localforage from 'localforage';
import { ProductData } from 'types';

const DB = '__wb-favorites';

class FavService {
    init() {
        this._updCounters();
    }

    async addProductinFavorites(product: ProductData) {
        const products = await this.get();
        await this.set([...products, product]);
    }

    async removeProductFromFavorites(product: ProductData) {
        const products = await this.get();
        await this.set(products.filter(({ id }) => id !== product.id));
    }

    async get(): Promise<ProductData[]> {
        return (await localforage.getItem(DB)) || [];
    }

    async set(data: ProductData[]) {
        await localforage.setItem(DB, data);
        this._updCounters();
    }

    async isInFav(product: ProductData) {
        const products = await this.get();
        return products.some(({ id }) => id === product.id);
    }

    private async _updCounters() {
        const products = await this.get();
        const favoritesNode = document.querySelector('.favorite') as HTMLElement;

        if (products.length > 0) {
            const count = products.length >= 10 ? '9+' : products.length;
            favoritesNode.style.display = 'inline-block';

            //@ts-ignore
            document.querySelectorAll('.js__favorite-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
        } else {
            favoritesNode.style.display = 'none';
        }
    }
}

export const favService = new FavService();
