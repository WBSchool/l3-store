import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import html from './productDetail.tpl.html';
import { cartService } from '../../services/cart.service';
import {favoritesService} from "../../services/favorites.service";

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

    const { id, src, name, description, salePriceU } = this.product;

    this.view.photo.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.description.innerText = description;
    this.view.price.innerText = formatPrice(salePriceU);
    this.view.btnBuy.onclick = this._addToCart.bind(this);
    this.view.btnFav.onclick = this._processFavorites.bind(this);

    const isInCart = await cartService.isInCart(this.product);
    const isInFavorites = await favoritesService.isInFavorites(this.product);

    if (isInCart) this._setInCart();
    if (isInFavorites) this._toggleFavorites();

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
  }

  private _addToCart() {
    if (!this.product) return;

    cartService.addProduct(this.product);
    this._setInCart();
  }

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
  }

  private _addToFavorites() {
    if (!this.product) return;

    favoritesService.addProduct(this.product);
    this._toggleFavorites();
  }

  private _removeFromFavorites() {
    if (!this.product) return;

    favoritesService.removeProduct(this.product);
    this._toggleFavorites();
  }

  private async _processFavorites() {
    if (!this.product) return;

    const isInFavorites = await favoritesService.isInFavorites(this.product);

    if (isInFavorites) {
      this._removeFromFavorites();
    } else {
      this._addToFavorites();
    }
  }

  private _toggleFavorites() {
    this.view.btnFav.children[0].classList.toggle('hide');
    this.view.btnFav.children[1].classList.toggle('hide');
  }
}

export const productDetailComp = new ProductDetail(html);
