import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchTags.tpl.html';

export class SearchTags {
  view: View;
  tags: string[];

  constructor(tags: string[]) {
    this.tags = tags;
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  render() {
    let nodeList: string[] = [];
    const tagNode = this.view.root.querySelector('.tag');

    this.tags.forEach((tag) => {
      const newTagNode = tagNode?.cloneNode(true) as HTMLElement;
      (newTagNode.querySelector('.tag__text') as HTMLElement).textContent = tag;

      nodeList.push(newTagNode.outerHTML);
    });

    if (nodeList.length === 1) {
      this.view.root.innerHTML = `Например, ${nodeList[0]}`;
    } else {
      const rootInnerHTML = `Например, ${nodeList.slice(0, nodeList.length - 1).join(', ')}  или ${nodeList[nodeList.length - 1]}`;
      this.view.root.innerHTML = rootInnerHTML;
    }
  }
}
