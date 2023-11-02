import localforage from 'localforage';
import { ProductData } from 'types';

const favoritesDB = '__favorites';

class FavoriteService {
    init() {
        this._updCountersFavorite();
    }

    async addProductToFavorites(product: ProductData) {
        const products = await this.getFavorites();
        await this.setFavorites([...products, product]);
    }

    async removeProductFromFavorites(product: ProductData) {
        const products = await this.getFavorites();
        await this.setFavorites(products.filter(({ id }) => id !== product.id));
    }

    async clearFavorites() {
        await localforage.removeItem(favoritesDB);
        this._updCountersFavorite();
    }

    async getFavorites(): Promise<ProductData[]> {
        return (await localforage.getItem(favoritesDB)) || [];
    }

    async setFavorites(data: ProductData[]) {
        await localforage.setItem(favoritesDB, data);
        this._updCountersFavorite();
    }

    async isInFavorites(product: ProductData) {
        const products = await this.getFavorites();
        return products.some(({ id }) => id === product.id);
    }

    private async _updCountersFavorite() {
        const products = await this.getFavorites();
        const count = products.length >= 10 ? '9+' : products.length;

        //Прячу или показываю ссылку на фаворит
        if (count === 0) {
            //@ts-ignore
            document.querySelectorAll('.favorite').forEach(($el: HTMLElement) => ($el.classList.add('hide')));
        }
        else if (count !== 0) {
            //@ts-ignore
            document.querySelectorAll('.favorite').forEach(($el: HTMLElement) => ($el.classList.remove('hide')));
        }

        //@ts-ignore
        document.querySelectorAll('.js__favorite-counter').forEach(($el: HTMLElement) => ($el.innerText = String(count || '')));
    }
}

export const favoriteService = new FavoriteService();
