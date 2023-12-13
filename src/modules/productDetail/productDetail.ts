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

    const isInCart = await cartService.isInCart(this.product);
    const isInFavorite = await favoriteService.isInFavorite(this.product);

    if (isInCart) this._setInCart();

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
    this._setInCart();
  }

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
  }

  //Метод для добавления товара в избранное
  private _addToFavorite() {
    if (!this.product) return;

    favoriteService.addProduct(this.product);
    this._setInFavorite();
    this.view.btnFav.onclick = this._removeFromFavorite.bind(this);
  }

  //Метод для удаления товара в избранного
  private _removeFromFavorite() {
    if (!this.product) return;
    
    favoriteService.removeProduct(this.product);
    this.view.svgFav.classList.remove('favorite');
    this.view.btnFav.onclick = this._addToFavorite.bind(this);
  }
  
  //Добавление стилей для иконки heart
  private _setInFavorite() {
    this.view.svgFav.classList.add('favorite');
  }
}

export const productDetailComp = new ProductDetail(html);
