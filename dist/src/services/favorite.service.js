var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import localforage from "localforage";
const DB = '__wb-favorite';
class FavoriteService {
    constructor() {
        this._flagFavorites = false;
    }
    init() {
        this.checkingFavorites();
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.get();
            yield this.set([...products, product]);
            yield this.checkingFavorites();
        });
    }
    removeProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.get();
            yield this.set(products.filter(({ id }) => id !== product.id));
            yield this.checkingFavorites();
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield localforage.getItem(DB)) || [];
        });
    }
    set(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            yield localforage.setItem(DB, data);
        });
    }
    _addFavoritesLink() {
        const container = document.querySelector(".header__buttons");
        const link = document.createElement('a');
        link.className = "favorites";
        link.textContent = "Избранное";
        link.href = "/favorites";
        container === null || container === void 0 ? void 0 : container.prepend(link);
        this._flagFavorites = true;
    }
    _removeFavoritesLink() {
        const favoritesLink = document.querySelector(".favorites");
        favoritesLink === null || favoritesLink === void 0 ? void 0 : favoritesLink.remove();
        this._flagFavorites = false;
    }
    checkingFavorites() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.get();
            if (products.length >= 1) {
                !this._flagFavorites && this._addFavoritesLink();
            }
            else {
                this._removeFavoritesLink();
            }
        });
    }
    isProductFavorite(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.get();
            return products.some(p => p.id === product.id);
        });
    }
    deleteFull() {
        return __awaiter(this, void 0, void 0, function* () {
            yield localforage.removeItem(DB);
            this._flagFavorites = false;
            this.checkingFavorites();
        });
    }
}
export const favoriteService = new FavoriteService();
