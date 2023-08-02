const BAD_PARAMS = { success: false, error: 'Error. Bad params' };
const NAMES = require('./mocks/stupid-names.json');
const DESCRIPTIONS = require('./mocks/descriptions.json');

const getProductSecretKey = (id) => Math.pow(id, 2).toString(16);

const shuffleArray = (src) =>
  src
    .map((val) => ({ val, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ val }) => val);

const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateStupidName = () => {
  return [getRandomFromArray(NAMES[0]), getRandomFromArray(NAMES[1]), getRandomFromArray(NAMES[2])].join(' ');
};

const MOCK_PRODUCTS = require('./mocks/products.json').map((product) => ({
  ...product,
  name: generateStupidName(),
  description: getRandomFromArray(DESCRIPTIONS),
  src: `/assets/products/p${getRandomFromArray(Array.from({ length: 25 }, (v, k) => k + 1))}.webp`
}));

const PRODUCTS_ON_PAGE = 32;

module.exports = (middlewares, devServer) => {
  const { app } = devServer;

  app.get('/api/getProduct', (req, res) => {
    const { id } = req.query;
    if (!id) res.json(BAD_PARAMS);

    setTimeout(() => {
      res.json(MOCK_PRODUCTS.find((product) => product.id === Number(req.query.id)));
    }, 300);
  });

  app.get('/api/getProducts', (req, res) => {
    setTimeout(() => res.json(MOCK_PRODUCTS), 300);
  });

  app.get('/api/getPopularProducts', (req, res) => {
    setTimeout(() => res.json(shuffleArray(MOCK_PRODUCTS).slice(30, 60)), 300);
  });

  app.get('/api/getProductSecretKey', (req, res) => {
    if (!req.query.id) res.json(BAD_PARAMS);

    setTimeout(() => {
      res.json(getProductSecretKey(req.query.id));
    }, 2500);
  });

  app.get('/api/makeOrder', (req, res) => {
    setTimeout(() => {
      res.json({ success: true });
    }, 2500);
  });

  app.get('/api/sendEvent', (req, res) => {
    setTimeout(() => {
      res.json({ success: true });
    }, 50);
  });

  return middlewares;
};
