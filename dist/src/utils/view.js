export class View {
    constructor() {
        this.querySelector = null;
        this.querySelectorAll = null;
    }
    bindModel(model) {
        Object.keys(model).forEach((k) => {
            if (this[k] != null) {
                this[k].innerText = model[k];
            }
        });
    }
}
