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
import { ProductList } from '../productList/productList';
import { formatPrice } from '../../utils/helpers';
import html from './productDetail.tpl.html';
import { cartService } from '../../services/cart.service';
import { favoriteService } from "../../services/favorite.service";
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.more = new ProductList();
        this.more.attach(this.view.more);
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = Number(urlParams.get('id'));
            const productResp = yield fetch(`/api/getProduct?id=${productId}`);
            this.product = yield productResp.json();
            if (!this.product)
                return;
            const { id, src, name, description, salePriceU } = this.product;
            this.view.photo.setAttribute('src', src);
            this.view.title.innerText = name;
            this.view.description.innerText = description;
            this.view.price.innerText = formatPrice(salePriceU);
            (yield favoriteService.isProductFavorite(this.product))
                ? this.setFavoriteButton()
                : this.resetFavoriteButton();
            this.view.btnBuy.onclick = this._addToCart.bind(this);
            this.view.btnFav.onclick = this._toggleFavorite.bind(this);
            const isInCart = yield cartService.isInCart(this.product);
            if (isInCart)
                this._setInCart();
            fetch(`/api/getProductSecretKey?id=${id}`)
                .then((res) => res.json())
                .then((secretKey) => {
                this.view.secretKey.setAttribute('content', secretKey);
            });
            fetch('/api/getPopularProducts')
                .then((res) => res.json())
                .then((products) => {
                this.more.update(products);
            });
            yield favoriteService.checkingFavorites();
        });
    }
    _addToCart() {
        if (!this.product)
            return;
        cartService.addProduct(this.product);
        this._setInCart();
    }
    _setInCart() {
        this.view.btnBuy.innerText = '✓ В корзине';
        this.view.btnBuy.disabled = true;
    }
    _toggleFavorite() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.product)
                return;
            if (yield favoriteService.isProductFavorite(this.product)) {
                yield favoriteService.removeProduct(this.product);
                this.resetFavoriteButton();
            }
            else {
                yield favoriteService.addProduct(this.product);
                this.setFavoriteButton();
            }
        });
    }
    setFavoriteButton() {
        this.view.btnFav.className = ['btn is_large btnFav'];
        this.view.btnFav.setAttribute('id', 'btnFav');
        this.view.btnFav.innerHTML = 'В избранном';
    }
    resetFavoriteButton() {
        this.view.btnFav.className = 'btnFav';
        this.view.btnFav.setAttribute('id', '');
        this.view.btnFav.innerHTML = `
        <svg class="svg-icon">
            <use xlink:href="#heart"></use>
         </svg>
    `;
    }
}
export const productDetailComp = new ProductDetail(html);
