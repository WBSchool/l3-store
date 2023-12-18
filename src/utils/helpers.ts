export const genUUID = () => {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

export const addElement = (parent: HTMLElement, tag: string, options?: object) => {
  const element = document.createElement(tag) as HTMLElement;

  if (options) Object.assign(element, options);

  parent.appendChild(element);

  return element;
};

export const formatPrice = (price: number) => {
  return (
    Math.round(price / 1000)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₽'
  );
};

/**
 * Проверка, виден ли элемент в окне просмотра (от 50% видимости)
 * @param elem HTML элемент
 * @returns Булевое значение
 */
export const isInViewport = (elem: HTMLElement) => {
  //Определяем положение элемента на экране просмотра
  let bounding = elem.getBoundingClientRect();
  
  //Полечаем высоту и ширину viewport-а
  let viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    bounding.top >= 0 && bounding.top <= viewportHeight - bounding.height / 2 &&
    bounding.left >= 0 && bounding.left <= viewportWidth - bounding.width / 2
  )
};