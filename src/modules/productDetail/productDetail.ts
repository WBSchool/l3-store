import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import html from './productDetail.tpl.html';
import { cartService } from '../../services/cart.service';
import { favoriteService } from '../../services/favorite.service';
import { statisticsService } from '../../services/statistics';
import { userService } from 'src/services/user.service';

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
    this.view.btnFav.onclick = this._addFavCart.bind(this);

    const isInFav = await favoriteService.isInFav(this.product);

    if (isInFav) {
      this.view.btnFav.classList.toggle('is__active');
    }

    const isInCart = await cartService.isInCart(this.product);

    if (isInCart) this._setInCart();

    fetch(`/api/getProductSecretKey?id=${id}`)
      .then((res) => res.json())
      .then((secretKey) => {
        if (this.product) {
          statisticsService.viewCardEvent(this.product, secretKey);
        }

        this.view.secretKey.setAttribute('content', secretKey);
      });

      fetch('/api/getPopularProducts', {
        headers: {
          'x-userid': await userService.getId(),
        }
      })
      .then((res) => res.json())
      .then((products) => {
        this.more.update(products);
      });
  }

  private _addToCart() {
    if (!this.product) return;

    cartService.addProduct(this.product);
    if (this.product) {
      statisticsService.addtoCardEvent(this.product);
    }
    this._setInCart();
  }

  private async _addFavCart() {
    if (!this.product) return;

    if (await favoriteService.isInFav(this.product)) {
      favoriteService.removeProduct(this.product);
      this.view.btnFav.classList.remove('is__active');
    } else {
      favoriteService.addProduct(this.product);
      this.view.btnFav.classList.add('is__active');
    }
  }

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
  }
}

export const productDetailComp = new ProductDetail(html);
