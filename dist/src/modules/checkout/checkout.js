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
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
class Checkout extends Component {
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            this.products = yield cartService.get();
            if (this.products.length < 1) {
                this.view.root.classList.add('is__empty');
                return;
            }
            this.products.forEach((product) => {
                const productComp = new Product(product, { isHorizontal: true });
                productComp.render();
                productComp.attach(this.view.cart);
            });
            const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
            this.view.price.innerText = formatPrice(totalPrice);
            this.view.btnOrder.onclick = this._makeOrder.bind(this);
        });
    }
    _makeOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            yield cartService.clear();
            fetch('/api/makeOrder', {
                method: 'POST',
                body: JSON.stringify(this.products)
            });
            window.location.href = '/?isSuccessOrder';
        });
    }
}
export const checkoutComp = new Checkout(html);
