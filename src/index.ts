import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";
import { favoritesService } from "./services/favorites.service";

new Router();
cartService.init();
userService.init();
favoritesService.init();

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
