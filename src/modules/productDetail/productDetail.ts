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
    this.view.btnFav.onclick = this._actionOnFavorite.bind(this); //Привязал кнопке действие

    const isInCart = await cartService.isInCart(this.product);

    const isInFav = await favoriteService.isInFavorites(this.product); //Узнал, есть ли продукт в фаворитах

    if (isInFav) this._setInFav(); //Если есть, запустить функцию

    if (isInCart) this._setInCart();

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

  //Действие при нажатии на кнопку фаворита
  private async _actionOnFavorite() {
    if (!this.product) return;

    const isInFav = await favoriteService.isInFavorites(this.product); //Проверка, есть ли он в фаворитах

    //Если есть, удалю, если нету, добавлю, и изменю класс
    if (isInFav) {
      favoriteService.removeProductFromFavorites(this.product);
      this.view.btnFav.classList.remove('isFav');

    } else if (!isInFav) {
      favoriteService.addProductToFavorites(this.product);
      this.view.btnFav.classList.add('isFav');
    }
  }

  //Если эта функция вызвалась, значит, продукт в фаворитах и включу кнопке обводку
  private _setInFav() {
    if (!this.product) return;

    this.view.btnFav.classList.add('isFav');
  }

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
  }
}

export const productDetailComp = new ProductDetail(html);
