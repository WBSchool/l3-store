import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";
import {favoriteService} from "./services/favorite.service";

new Router();
cartService.init();
userService.init();
favoriteService.init()

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
