import { favoritesService } from '../../services/favorites.service';
import { Component } from '../component';
import { ProductData } from 'types';
import { ProductList } from '../productList/productList';
import html from './favoritesList.tpl.html';

class FavoritesList extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);
    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    const favoriteProducts = await this.getFavoriteProducts();
    this.productList.update(favoriteProducts);
  }

  getFavoriteProducts() {
    return new Promise<ProductData[]>(async (res, _) => {
      const favoriteIDs = await favoritesService.get();
      const productsPromises = favoriteIDs.map(
        (ID) =>
          new Promise<ProductData | null>((resProd, _) => {
            fetch(`api/getProduct?id=${ID}`)
              .then((response) => response.json())
              .then((data: ProductData) => resProd(data))
              .catch((_) => resProd(null));
          })
      );
      const favoriteProducts = (await Promise.all(productsPromises)).filter((data) => data) as ProductData[];
      res(favoriteProducts);
    });
  }
}

export const favoritesComp = new FavoritesList(html);
