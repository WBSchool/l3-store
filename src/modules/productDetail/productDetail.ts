import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import html from './productDetail.tpl.html';
import { cartService } from '../../services/cart.service';
import { favoriteService } from '../../services/favorite.service';

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
    this.view.heart.onclick = this._addToFavorites.bind(this);
    this.view.heartActive.onclick = this._removeProductFavorite.bind(this);

    const isInCart = await cartService.isInCart(this.product);
    const isInFavorite = await favoriteService.isInFavorite(this.product);

    if (isInCart) this._setInCart();
    if (isInFavorite) this._setInFavorites();

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

  // добавление в избранное
  private _addToFavorites() {
    console.log(this.product);
    if (!this.product) return;

    favoriteService.addProductFavorite(this.product);
    this._setInFavorites();
  }
  // удаление из избранного
  private _removeProductFavorite() {
    if (!this.product) return;

    favoriteService.removeProductFavorite(this.product);
    this._outInFavorites();
  }
  ////

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
  }

  // добавление в избранное
  private _setInFavorites() {
    this.view.heart.classList.add('hide');
    this.view.heartActive.classList.remove('hide');
  }
  private _outInFavorites() {
    this.view.heart.classList.remove('hide');
    this.view.heartActive.classList.add('hide');
  }
  ///
}

export const productDetailComp = new ProductDetail(html);
