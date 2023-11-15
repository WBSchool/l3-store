import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import html from './productDetail.tpl.html';
import { cartService } from '../../services/cart.service';
import { statisticsService } from '../../services/statistics.service';

class ProductDetail extends Component {
  more: ProductList;
  product?: ProductData;

  constructor(props: any) {
    super(props);

    this.more = new ProductList();
    this.more.attach(this.view.more);
  }

  async render() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get('id'));

    const productResp = await fetch(`/api/getProduct?id=${productId}`);
    this.product = await productResp.json();

    if (!this.product) return;
    if (cartService.isInFavorites(this.product.id)) this._setFalorite();

    const { id, src, name, description, salePriceU } = this.product;

    this.view.photo.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.description.innerText = description;
    this.view.price.innerText = formatPrice(salePriceU);
    this.view.btnBuy.onclick = this._addToCart.bind(this);
    this.view.btnFavorite.onclick = this._toggleFavorite.bind(this);
    

    const isInCart = await cartService.isInCart(this.product);

    if (isInCart) this._setInCart();

    fetch(`/api/getProductSecretKey?id=${id}`)
      .then((res) => res.json())
      .then((secretKey) => {
        this.view.secretKey.setAttribute('content', secretKey);
        const type = this.product?.log && Object.keys(this.product?.log).length ? "viewCardPromo" : "viewCard";
        statisticsService.send(type, { ...this.product, secretKey });
      });

    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.more.update(products);
      });
  }

  private _addToCart() {
    if (!this.product) return;
    cartService.addProduct(this.product);
    this._setInCart();
    statisticsService.send("addToCard", this.product);
  }

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
  }

  private _toggleFavorite() {
    if (!this.product) return;
    this._setFalorite();
    if (cartService.isInFavorites(this.product.id)) {
      cartService.removeFavorite(this.product.id);
      this._delFalorite();
    } else {
      cartService.addFavorite(this.product);
      this._setFalorite();
    }
    
  }

  private _setFalorite() {
    this.view.btnFavorite.innerHTML= '<svg class="svg-icon"><use xlink:href="#heart-fill"></use></svg>';
  }

  private _delFalorite() {
    this.view.btnFavorite.innerHTML= '<svg class="svg-icon"><use xlink:href="#heart"></use></svg>';
  }
}

export const productDetailComp = new ProductDetail(html);
