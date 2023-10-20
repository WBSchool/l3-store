import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { favoritesService } from "./services/favorites.service";
import { userService } from "./services/user.service";

new Router();
cartService.init();
favoritesService.init();
userService.init();

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
