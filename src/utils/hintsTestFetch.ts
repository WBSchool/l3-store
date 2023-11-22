// Имитация запроса на сервер для удобства тестирования

export const fetchHints = async function (): Promise<Array<string>> {
  return new Promise (function (resolve) {
    setTimeout(() => resolve(['чехол iphone 13 pro', 'коляски agex', 'яндекс станция 2']), 500);
  })
}