// import { ProductData, SuggesionData } from "types";

import { SuggesionData } from "types";

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

export const getSuggestions = async () => {
  const data:SuggesionData[] = [
    {
      name: 'чехол iphone 13 pro',
      href: '/product?id="какой-то id"'
    },
    {
      name: 'коляски agex',
      href: '/product?id="какой-то id"'
    },
    {
      name: 'яндекс станция 2',
      href: '/product?id="какой-то id"'
    }
  ]

  return data
}
