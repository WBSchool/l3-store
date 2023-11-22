import {Component} from '../component';
import {ProductList} from '../productList/productList';
import {formatPrice} from '../../utils/helpers';
import {ProductData} from 'types';
import html from './productDetail.tpl.html';
import {cartService} from '../../services/cart.service';
import {favoriteService} from "../../services/favorite.service";
import {analyticsService} from "../../services/analytics.service";


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
    this.view.btnFav.onclick = this._toggleFavorites.bind(this);
    await this._isFavorite();

    const isInCart = await cartService.isInCart(this.product);

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
        const payload = {...this.product,secretKey}
        //проверяем лог
        const eventType = Object.keys(this.product?.log).length>0 ? 'viewCardPromo': 'viewCard'
        try{
          analyticsService.sendEvent(eventType,payload)
        }catch (error){
          console.error(error)
        }

      });
  }

  private async _toggleFavorites() {
    if (!this.product) return;

    try {
      await favoriteService.toggleProduct(this.product);
      await this._isFavorite();
    } catch (e) {
      console.error('error', e);
    }
  }
  private async _isFavorite() {
    try {
      const favorites = await favoriteService.getProducts();

      if (this.product !== undefined) {
        const isFavorite = favorites.some((item) => item.brandId === this.product!.brandId);

        if (isFavorite) {
          this.view.favSvg?.classList.add('active');
          this.view.noFavSvg?.classList.remove('active');
        } else {
          this.view.noFavSvg?.classList.add('active');
          this.view.favSvg?.classList.remove('active');
        }
      }
    } catch (e) {
      console.error('error', e);
    }
  }

  private _addToCart() {
    if (!this.product) return;
    const payload = this.product;

    cartService.addProduct(this.product)
        .then(() => {
          this._setInCart();
          return analyticsService.sendEvent('addToCart', payload);
        })
        .catch((error) => {
          console.error(error);
        });
  }


  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
  }
}

export const productDetailComp = new ProductDetail(html);
