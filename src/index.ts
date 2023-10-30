import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";
import { favoritesService } from "./services/favorites.service";

new Router();
favoritesService.init();
cartService.init();
userService.init();


setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
