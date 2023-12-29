var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import localforage from 'localforage';
const DB = '__wb-cart';
class CartService {
    init() {
        this._updCounters();
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.get();
            yield this.set([...products, product]);
        });
    }
    removeProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.get();
            yield this.set(products.filter(({ id }) => id !== product.id));
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield localforage.removeItem(DB);
            this._updCounters();
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield localforage.getItem(DB)) || [];
        });
    }
    set(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield localforage.setItem(DB, data);
            this._updCounters();
        });
    }
    isInCart(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.get();
            return products.some(({ id }) => id === product.id);
        });
    }
    _updCounters() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.get();
            const count = products.length >= 10 ? '9+' : products.length;
            document.querySelectorAll('.js__cart-counter').forEach(($el) => ($el.innerText = String(count || '')));
        });
    }
}
export const cartService = new CartService();
