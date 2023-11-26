import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './searchSuggesionBlock.tpl.html'
import { SuggesionData } from "types";
import { SearchSuggestion } from '../searchSuggestion/searchSuggestion';

export class SearchSuggesionBlock {
   view: View;
   suggestions: SuggesionData[];

   constructor(){
      this.suggestions = []
      this.view = new ViewTemplate(html).cloneView()
   }

   attach($root: HTMLElement){
      $root.innerHTML = '';
      $root.appendChild(this.view.root);
   }

   update(suggestions: SuggesionData[]){
      this.suggestions = suggestions
      this.render()
   }

   render(){
      this.view.root.innerHTML = '';
      this.suggestions.forEach((suggestion, index) => {
         if(index === 0){
            this.view.root.innerHTML += 'Например,'
         }

         const searchSuggestionComp = new SearchSuggestion(suggestion)
         searchSuggestionComp.render()
         searchSuggestionComp.attach(this.view.root)

         if(index === 0){
            this.view.root.innerHTML += ','
         }

         if(index === 1){
            this.view.root.innerHTML += 'или'
         }
      })
   }
}