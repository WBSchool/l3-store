import { Component } from '../component';
import html from './search.tpl.html';

type Product = {
  url: string;
  name: string;
  id?: string;
};

export class SearchTips extends Component {
  tips: Product[] = [];

  async render() {
    const searchInput = document.getElementById('goodsSearch') as HTMLInputElement;
    const searchUl = document.querySelector('.options') as HTMLUListElement;
    const hideSearchBox = document.querySelector('.search__tips-box') as HTMLDivElement;
    const goodsTips = document.querySelector('.search_box-tips') as HTMLDivElement;

    searchInput.addEventListener('input', () => {
      const options = this.getOptions(searchInput.value.trim(), this.tips);
      const html = options
        .map((products: Product) => {
          return `<li class='search__link' ><a href=${products.url}>${products.name}</a></li>`;
        })
        .slice(0, 5)
        .join('');

      searchUl.innerHTML = html;
      if (searchInput.value.trim() !== '') {
        goodsTips.classList.add('hide');
        hideSearchBox.classList.remove('hide');
      } else {
        goodsTips.classList.remove('hide');
        hideSearchBox.classList.add('hide');
      }
    });

    await fetch('/api/getProducts')
      .then((res) => res.json())
      .then((data) => {
        this.tips = data.map((item: Product) => ({
          name: item.name,
          url: `product?id=${item.id}`
        }));
      });
  }

  private getOptions(word: string, options: Product[]) {
    return options.filter((product: any) => {
      const regex = new RegExp(word, 'gi');
      return product.name.match(regex);
    });
  }
}

export const searchComp = new SearchTips(html);
