import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import html from './productDetail.tpl.html';
import { cartService } from '../../services/cart.service';
import { favoriteService } from "../../services/favorite.service";

class ProductDetail extends Component {
  more: ProductList;
  product?: ProductData;

  constructor(props: any) {
    super(props);

    // Создание экземпляра ProductList для отображения похожих товаров
    this.more = new ProductList();
    this.more.attach(this.view.more);
  }

  async render() {
    // Получение идентификатора товара из параметров URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get('id'));

    // Запрос информации о товаре по его идентификатору
    const productResp = await fetch(`/api/getProduct?id=${productId}`);
    this.product = await productResp.json();

    if (!this.product) return;

    // Получение данных о товаре
    const { id, src, name, description, salePriceU } = this.product;

    // Отображение данных о товаре на странице
    this.view.photo.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.description.innerText = description;
    this.view.price.innerText = formatPrice(salePriceU);

    // Установка состояния кнопки - Избранное (добавить или удалить)
    await favoriteService.isProductFavorite(this.product)
        ? this.setFavoriteButton()
        : this.resetFavoriteButton();

    // Обработчики событий для кнопок купить и избранное
    this.view.btnBuy.onclick = this._addToCart.bind(this);
    this.view.btnFav.onclick = this._toggleFavorite.bind(this);

    // Проверка, находится ли товар в корзине
    const isInCart = await cartService.isInCart(this.product);

    // Если товар уже в корзине, изменить кнопку
    if (isInCart) this._setInCart();

    // Запрос на получение секретного ключа для товара
    fetch(`/api/getProductSecretKey?id=${id}`)
        .then((res) => res.json())
        .then((secretKey) => {
          this.view.secretKey.setAttribute('content', secretKey);
        });

    // Запрос популярных товаров
    fetch('/api/getPopularProducts')
        .then((res) => res.json())
        .then((products) => {
          this.more.update(products);
        });
  }

  // Добавления товара в корзину
  private _addToCart() {
    if (!this.product) return;

    cartService.addProduct(this.product);
    this._setInCart();
  }

  // Установка состояний для кнопки купить, после добавления товара в корзину
  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
  }

  // Добавление/удаление товара из избранного
  private async _toggleFavorite() {
    if (!this.product) return;

    if (await favoriteService.isProductFavorite(this.product)) {
      // Если товар уже в избранном, то удалить кнопку
      await favoriteService.removeProduct(this.product);
      this.resetFavoriteButton();
    } else {
      // Если товар не в избранном, то добавить кнопку
      await favoriteService.addProduct(this.product);
      this.setFavoriteButton();
    }
  }

  // Установка классов, id и текста для кнопки, при добавлении товара в избранное
  private setFavoriteButton() {
    this.view.btnFav.className = ['btn is_large btnFav'];
    this.view.btnFav.setAttribute('id','btnFav');
    this.view.btnFav.innerHTML = 'В избранном';
  }

  // Сброс классов, id и текста для кнопки, при удалении товара из избранного
  private resetFavoriteButton() {
    this.view.btnFav.className = 'btnFav';
    this.view.btnFav.setAttribute('id','');
    this.view.btnFav.innerHTML = `
        <svg class="svg-icon">
            <use xlink:href="#heart"></use>
         </svg>
    `;
  }
}

// Создание экземпляра
export const productDetailComp = new ProductDetail(html);
