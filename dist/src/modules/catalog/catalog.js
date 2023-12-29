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
import html from './catalog.tpl.html';
import { ProductList } from '../productList/productList';
class Catalog extends Component {
    constructor(props) {
        super(props);
        this.productList = new ProductList();
        this.productList.attach(this.view.products);
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const productsResp = yield fetch('/api/getProducts');
            const products = yield productsResp.json();
            this.productList.update(products);
        });
    }
}
export const catalogComp = new Catalog(html);
