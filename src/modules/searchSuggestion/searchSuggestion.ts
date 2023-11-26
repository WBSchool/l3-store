import { ViewTemplate } from "../../utils/viewTemplate";
import { View } from "../../utils/view";
import html from './searchSuggestion.tpl.html'
import { SuggesionData } from "types";

export class SearchSuggestion {
   view: View;
   suggestion: SuggesionData;

   constructor(suggestion: SuggesionData){

      this.suggestion = suggestion
      this.view = new ViewTemplate(html).cloneView()
   }

   attach($root: HTMLElement){
      $root.appendChild(this.view.root)
   }

   render() {
      const { name, href } = this.suggestion;
      this.view.root.setAttribute('href', href)
      this.view.text.innerText = name
   }
}