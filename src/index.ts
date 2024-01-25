import './icons';
import Router from './router';
import { cartService } from './services/cart.service';
import { userService } from './services/user.service';

window.onload = async (e) => {
  await userService.init();
  cartService.init();
  new Router().route(e);
};

setTimeout(() => {
  document.body.classList.add('is__ready');
}, 250);
