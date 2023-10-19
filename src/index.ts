import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { selectService } from "./services/select.service";
import { userService } from "./services/user.service";

new Router();
cartService.init();
selectService.init();
userService.init();

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
