import tradeExmaples, {tradeLink} from 'src/utils/tradeExmaples';
import { Component } from '../component';
import html from './searchString.tpl.html';

class SearchLine extends Component {
  constructor(props: any) {
    super(props);
  }

  fetchHints() {
    return new Promise<tradeLink[]>((res, _) => {
      // Мок для подсказок. В будущем заменить на запрос к серверу
      function getRandomIndex() {
        const variantsLength = tradeExmaples.length;
        const index = Math.trunc(Math.random() * variantsLength);
        return index;
      }
      setTimeout(() => {
        res([
            tradeExmaples[getRandomIndex()], 
            tradeExmaples[getRandomIndex()], 
            tradeExmaples[getRandomIndex()]
        ]);
      }, 200);
    });
  }

  async render() {
    const hints = await this.fetchHints()
    this.view.hint0.innerText = hints[0].name
    this.view.hint0.href = `/product?id=${hints[0].id}`
    this.view.hint1.innerText = hints[1].name
    this.view.hint1.href = `/product?id=${hints[1].id}`
    this.view.hint2.innerText = hints[2].name
    this.view.hint2.href = `/product?id=${hints[2].id}`

    
  }
}

export const searchLine = new SearchLine(html);
