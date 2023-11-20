import { Component } from "../component";
import { ProductList } from "../productList/productList";
import { favoriteService } from "../../services/favorite.service";
import html from './favoritePage.tpl.html';

class Favorite extends Component {
  favoriteProducts: ProductList;
  
  constructor(props: any) {
    super(props);
  
    this.favoriteProducts = new ProductList();
    this.favoriteProducts.attach(this.view.favoriteProducts);
  }
  
  async render() {
    const products = await favoriteService.get();
    
    if (products.length === 0) {
      this.view.root.classList.add('is__empty');
      return;
        
    } else {
      this.favoriteProducts.update(products);
    }
  }
}
  
export const favoritePageComp = new Favorite(html);