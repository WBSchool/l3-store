import './icons';
import Router from './router';
import { cartService } from './services/cart.service';
import { userService } from './services/user.service';

const initApp = async () => {
  await userService.init();
};

initApp().then(() => {
  const route = new Router();

  route.route();
  cartService.init();
  document.body.classList.add('is__ready');
});
