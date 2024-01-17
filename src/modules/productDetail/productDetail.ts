import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import html from './productDetail.tpl.html';
import { cartService } from '../../services/cart.service';
import { favoriteService } from '../../services/favorite.service';
import { eventAnaliticsService } from '../../services/eventAnalitics.service';

const heartIn = `
  <svg viewBox="2 2 13 13" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" fill="var(--key-color)" clip-rule="evenodd" d="M8.018 14L3.022 8.46c-1.338-1.482-1.338-3.887 0-5.37 1.438-1.595 3.623-1.354 4.996.167 1.373-1.521 3.559-1.762 4.997-.167 1.338 1.483 1.338 3.888 0 5.37L8.018 14z" ></path>
  </svg>`;

const heart = `<svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" fill="var(--key-color)"
  d="M8.637 4C5.422 4 3 6.393 3 9.455c0 1.847 1.23 4.143 3.446 6.777 2.026 2.408 4.733 4.937 7.621 7.446 2.881-2.507 5.556-5.034 7.55-7.44C23.795 13.607 25 11.307 25 9.454 25 6.368 22.686 4 19.498 4c-1.763 0-3.54.815-4.676 2.121a1 1 0 0 1-1.509 0C12.176 4.815 10.4 4 8.637 4ZM1 9.455C1 5.236 4.37 2 8.637 2c1.98 0 3.952.763 5.43 2.054C15.548 2.763 17.518 2 19.498 2 23.793 2 27 5.265 27 9.455c0 2.606-1.624 5.38-3.843 8.058-2.254 2.721-5.29 5.537-8.437 8.245a1 1 0 0 1-1.305 0c-3.144-2.705-6.213-5.52-8.5-8.239C2.665 14.845 1 12.068 1 9.455Z" />
</svg>`;

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

    //клик по кнопке "Добавить в избранное"
    this.view.btnFav.onclick = this._addToFavorite.bind(this);

    const isInCart = await cartService.isInCart(this.product);

    const isInFavorite = await favoriteService.isInFavorite(this.product);

    if (isInCart) this._setInCart();

    if (isInFavorite) this._setInFavorite();

    if (isInFavorite) {
      this.view.btnFav.onclick = this._removeFromFavorite.bind(this);
      this._setInFavorite();
    } else {
      this.view.btnFav.onclick = this._addToFavorite.bind(this);
    };

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
    // отправляем аналитику добавление товара в корзину
    eventAnaliticsService.addToCart(this.product);
    this._setInCart();
  }

  // добавить в Избранное
  private _addToFavorite() {
    if (!this.product) return;

    favoriteService.addProductToFavorite(this.product);
    this.view.btnFav.onclick = this._removeFromFavorite.bind(this);
    this._setInFavorite();
  }

  // удалить из Избранных
  private _removeFromFavorite() {
    if (!this.product) return;

    favoriteService.removeProduct(this.product);
    this.view.btnFav.onclick =  this._addToFavorite.bind(this);
    this.view.btnFav.innerHTML = heart;
  }

  // при клике залить кнопку
  private _setInFavorite() {
    this.view.btnFav.innerHTML = heartIn;
  }

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
  }
}

export const productDetailComp = new ProductDetail(html);
