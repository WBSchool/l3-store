import localforage from 'localforage';
import { ProductData } from "../../types";

const DB = '__wb-favorites';

class FavoriteService {
    async init(): Promise<void> {
        await this.updateCount();
    }

    async getProducts(): Promise<ProductData[]> {
        try {
            const data = await localforage.getItem<ProductData[]>(DB);
            return data || [];
        } catch (e) {
            console.error('error', e);
            return [];
        }
    }

    async setProducts(products: ProductData[]): Promise<void> {
        try {
            await localforage.setItem(DB, products);
        } catch (e) {
            console.error('error', e);
        }
    }

    async toggleProduct(product: ProductData): Promise<void> {
        const products = await this.getProducts();
        const isFavorite = products.some(item => item.id === product.id);

        if (!isFavorite) {
            await this.setProducts([...products, product]);
        } else {
            const filteredFavorites = products.filter(item => item.id !== product.id);
            await this.setProducts(filteredFavorites);
        }

        await this.updateCount();
    }

    private async updateCount(): Promise<void> {
        try {
            const products = await this.getProducts();
            const count = products.length;

            const favoritesCount = document.querySelector<HTMLElement>('.js__favorites-counter') as HTMLElement;
            const favoritesLink = document.querySelector<HTMLElement>('.favoritesLink') as HTMLElement;

            if (favoritesCount && favoritesLink) {
                favoritesCount.textContent = count.toString();
                favoritesLink.classList.toggle('active', count !== 0);
            }
        } catch (e) {
            console.error('error', e);
        }
    }
}

export const favoriteService = new FavoriteService();
