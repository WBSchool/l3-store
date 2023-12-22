// Имитация запроса на сервер для удобства тестирования

export const fetchHints = async function (): Promise<Array<any>> {
  return new Promise (function (resolve) {
    setTimeout(() => resolve([
      {text:'чехол iphone 13 pro', link: '/catalog'},
      {text: 'коляски agex', link: '/catalog' }, 
      {text: 'яндекс станция 2', link: '/catalog'}
    ]), 300);
  })
}