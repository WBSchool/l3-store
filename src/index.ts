import "./icons";
import Router from "./router";
import { cartService } from "./services/cart.service";
import { userService } from "./services/user.service";

const initProject = async () => {
  await userService.init();
  cartService.init();
}

const router = new Router();

window.onload = async (e) => {
  await initProject()
  router.route(e)
}

window.onhashchange = function(e) {
  router.route(e)
}

setTimeout(() => {
  document.body.classList.add("is__ready");
}, 250);
