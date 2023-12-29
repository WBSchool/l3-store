var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component } from '../component';
import html from './favorites.tpl.html';
import { favoriteService } from "../../services/favorite.service";
import { Product } from "../product/product";
class Favorites extends Component {
    update() {
        this.render();
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            this.view.deleteFull.onclick = this.deleteFull.bind(this);
            this.products = yield favoriteService.get();
            if (this.products.length < 1) {
                this.view.root.classList.add('is__empty');
                return;
            }
            this.products.forEach((product) => {
                const productComp = new Product(product);
                productComp.render();
                productComp.attach(this.view.cart);
            });
        });
    }
    deleteFull() {
        return __awaiter(this, void 0, void 0, function* () {
            yield favoriteService.deleteFull();
            this.update();
        });
    }
}
export const favoritesComp = new Favorites(html);
