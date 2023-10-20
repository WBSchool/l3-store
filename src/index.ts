import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { favoriteService } from "./services/favorite.service";
import { userService } from "./services/user.service";

new Router();
cartService.init();
favoriteService.init();
userService.init();

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
