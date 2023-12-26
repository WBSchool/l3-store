import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";
import {favouritesService} from "./services/favourites.service";

new Router();
cartService.init();
favouritesService.init();
userService.init();

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
