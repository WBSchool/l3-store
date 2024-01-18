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
};

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

export const isElementInViewport = (el: HTMLElement) => {
  let rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height / 2 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + rect.width / 2
  );
};
