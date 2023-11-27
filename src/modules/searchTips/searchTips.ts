import html from "./searchTips.tpl.html";
import { Component } from "../component";
import { ProductData } from "../../../types";

interface ITips {
    name: string;
    url: string;
}

export class SearchTips extends Component {
    private tips: ITips[] = [];

    async render() {
        const searchInput = document.getElementById('productSearch') as HTMLInputElement;


        let debounceTimer: NodeJS.Timeout;

        searchInput.addEventListener('input', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                const searchTerm = searchInput.value.trim().toLowerCase();
                if (searchTerm === '') {
                    // Если ввод пуст, генерируем случайные подсказки
                    this.generateRandomTips();
                } else {
                    this.updateTipsWithSearch(searchTerm);
                }
            }, 300);
        });

        const res = await fetch('/api/getProducts');
        const products: ProductData[] = await res.json();
        this.tips = products.map((item) => ({
            name: item.name,
            url: `product?id=${item.id}`,
        }));

        this.generateRandomTips();
    }

    private updateTipsWithSearch(searchTerm: string) {
        const tipsEls = document.querySelectorAll('.tip');

        if (!searchTerm) {
            tipsEls.forEach((item) => {
                item.textContent = '';
                item.removeAttribute('href');
            });
            return;
        }

        const matchingTips = this.tips.filter((tip) => {
            const tipWords = tip.name.toLowerCase().split(' ');
            return searchTerm.split(' ').every((word) => tipWords.some((tipWord) => tipWord.includes(word)));
        });

        const displayedTips = matchingTips.slice(0, 3);

        if (displayedTips.length > 0) {
            displayedTips.forEach((tip, index) => {
                const item = tipsEls[index];
                item.textContent = `${tip.name}`;
                item.setAttribute('href', tip.url);
            });
        } else {
            //Показать случайные подсказки, если нет подходящих
            this.generateRandomTips();
        }
    }

    private generateRandomTips() {
        const tipsEls = document.querySelectorAll('.tip');

        tipsEls.forEach((item) => {
            const obj = this.generateRandomEl();
            const [first, second] = obj.name.split(' ');

            item.textContent = `${first} ${second}`;
            item.setAttribute('href', obj.url);
        });
    }

    private generateRandomEl() {
        const randomIndex = Math.floor(Math.random() * this.tips.length);
        return this.tips[randomIndex];
    }
}

export const searchTipsComp = new SearchTips(html);
