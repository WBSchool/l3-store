import localforage from "localforage";
import { ProductData } from "../../types";

// Имя в бд для хранения избранных товаров в локальном хранилище
const DB = '__wb-favorite';

class FavoriteService {
    // Инициализация сервиса
    init() {
        this.checkingFavorites();
    }

    private _flagFavorites = false;

    // Добавление товара в избранное
    async addProduct(product: ProductData) {
        // Получение текущего списка избранных товаров
        const products = await this.get();

        // Добавление нового товара в список
        await this.set([...products, product]);

        // После удаления товара, обновляем ссылку на избранное
        await this.checkingFavorites();
    }

    // Удаление товара из избранного
    async removeProduct(product: ProductData) {
        // Получение текущего списка избранных товаров
        const products = await this.get();

        // Удаление товара из списка
        await this.set(products.filter(({ id }) => id !== product.id));

        // После удаления товара, обновляем ссылку на избранное
        await this.checkingFavorites();
    }


    // Получение списка избранных товаров
    async get(): Promise<ProductData[]> {
        return (await localforage.getItem(DB)) || [];
    }

    // Запись списка избранных товаров
    async set(data: ProductData[]) {
        await localforage.setItem(DB, data);

        await this._updCounters();
    }

    // Добавление ссылки на избранное в интерфейс
    private _addFavoritesLink() {
        const container = document.querySelector(".header__buttons");
        const link = document.createElement('a');
        const span = document.createElement('span');

        span.className = 'favCounter js__fav-counter';

        link.className = "favorites";
        link.textContent = " Избранное ";
        link.href = "/favorites";

        link.appendChild(span);

        container?.prepend(link);

        // Установка флага
        this._flagFavorites = true;
    }

    // Удаление ссылки на избранное
    private _removeFavoritesLink() {
        const favoritesLink = document.querySelector(".favorites");
        favoritesLink?.remove();

        // Сбрасываем флаг
        this._flagFavorites = false;
    }

    // Проверка наличия избранных товаров
    async checkingFavorites() {
        const products = await this.get();

        // Добавляем или удаляем ссылку на страницу избранных
        if (products.length >= 1 ) {
            if (!this._flagFavorites) {
                this._addFavoritesLink();
                await this._updCounters();
            }
        } else {
            this._removeFavoritesLink();
        }
    }

    // Проверка - является ли товар избранным
    async isProductFavorite(product: ProductData) {
        const products = await this.get();
        // true/false, узнаем, есть ли в массиве хотяб один элемент, удовлетворяющий условию callback
        return products.some(p => p.id === product.id);
    }

    // Удаление всех избранных товаров
    async deleteFull() {
        // Удаляем объект из локального хранилища
        await localforage.removeItem(DB);
        // Сбрасываем флаг
        this._flagFavorites = false;
        // Проверяем наличие избранного
        this.checkingFavorites();
    }

    private async _updCounters() {
        const products = await this.get();
        const count = products.length >= 10 ? '9+' : products.length;
        const counter = document.querySelector('.js__fav-counter');

        if (counter) {
            count > 0 ? counter.innerHTML = count.toString() : counter.innerHTML = '';
        }
    }
}

// Создание экземпляра
export const favoriteService = new FavoriteService();
