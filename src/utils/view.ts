export class View {
  public root!: HTMLElement;
  public querySelector: HTMLElement['querySelector'] | null;
  public querySelectorAll: HTMLElement['querySelectorAll'] | null;
  [name: string]: any;

  constructor() {
    this.querySelector = null;
    this.querySelectorAll = null;
  }

  bindModel(this: any, model: any) {
    Object.keys(model).forEach((k) => {
      if (this[k] != null) {
        this[k].innerText = model[k];
      }
    });
  }
}
