import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { favoriteProductsService } from "./services/favoriteProducts.service";
import { userService } from "./services/user.service";

new Router();
cartService.init();
userService.init();
favoriteProductsService.init();

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
