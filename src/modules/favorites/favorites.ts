import { Component } from '../component';
import html from './favorites.tpl.html';
import { favoriteService } from "../../services/favorite.service";
import { ProductData } from "../../../types";
import { Product } from "../product/product";

class Favorites extends Component {
    // Хранение избранных товаров
    products!: ProductData[];

    // Обновление компонента
    update() {
        this.render()
    }

    // Отрисовка компонента
    async render() {
        // Обработчик для кнопки удаления всех избранных товаров
        this.view.deleteFull.onclick = this.deleteFull.bind(this)
        // Получение списка избранных товаров
        this.products = await favoriteService.get();

        // Если список пуст, то добавить класс - is__empty
        if (this.products.length < 1) {
            this.view.root.classList.add('is__empty');
            return;
        }

        this.products.forEach((product) => {
            // Создание экземпляра компонента Product
            const productComp = new Product(product);

            // Отрисовка компонента Product
            productComp.render();

            // Прикрепление компонента Product к представлению карточки
            productComp.attach(this.view.cart);
        });
    }

    // Удаление всех избранных товаров
    async deleteFull() {
        // Вызов из сервиса удаление всех избранных товаров
        await favoriteService.deleteFull();

        // Обновление компонента после удаления
        this.update();
    }
}

// Создание экземпляра
export const favoritesComp = new Favorites(html);
