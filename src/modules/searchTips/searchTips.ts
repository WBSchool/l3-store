import html from './searchTips.tpl.html';
import { Component } from '../component';
import { MOCK_SEARCH_TAGS } from '../../utils/mock-data';

export class SearchTips extends Component {
  randomPopularTags: Array<string>;
  tagsArray: Array<string>;
  tipsCount: number;

  constructor(props: any, tagsArray: Array<string>) {
    super(props);

    this.tipsCount = 3;
    this.tagsArray = tagsArray;
    this.randomPopularTags = this._getPopularTags(this.tipsCount, this.tagsArray);
  }

  _getPopularTags(count: number, tagsArray: Array<string>) {
    let newArr: Array<string> = [];

    const getRandomTag = () => {
      return tagsArray[Math.floor(Math.random() * tagsArray.length)];
    };

    const pushRandomTag = () => {
      let randomTag = getRandomTag();
      if (!newArr.some((tag) => tag === randomTag)) {
        newArr.push(randomTag);
      } else pushRandomTag();
    };

    for (let i = 0; i < count; i++) {
      pushRandomTag();
    }

    return newArr;
  }

  handleTagClick(evt: MouseEvent) {
    const element = evt.target as HTMLElement;
    // здесь можно будет получить текст тега для дальнейшего использования в поиске
    console.log(element.textContent);
  }

  render() {
    for (let i = 0; i < this.randomPopularTags.length; i++) {
      const element = this.view[`tag_${i}`];
      element.innerText = this.randomPopularTags[i];
      element.addEventListener('click', this.handleTagClick);
    }
  }
}

export const searchTipsComp = new SearchTips(html, MOCK_SEARCH_TAGS);
