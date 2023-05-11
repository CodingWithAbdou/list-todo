import FullList from "../model/FullList";

interface DomList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}
export default class ListTemplate implements DomList {
  ul: HTMLUListElement;

  static getInstance: ListTemplate = new ListTemplate();
  private constructor() {
    this.ul = <HTMLUListElement>document.getElementById("listItems");
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((obj) => {
      const li = <HTMLLIElement>document.createElement("li");
      li.className = "item";

      const input = <HTMLInputElement>document.createElement("input");
      input.type = "checkbox";
      input.id = obj.id;
      input.checked = obj.checked;
      li.append(input);

      input.addEventListener("change", () => {
        obj.checked = !obj.checked;
        fullList.save();
      });

      const label = <HTMLLabelElement>document.createElement("label");
      label.htmlFor = obj.id;
      const labelText = document.createTextNode(obj.item);
      label.append(labelText);
      li.append(label);

      const button = <HTMLButtonElement>document.createElement("button");
      button.classList.add("button");
      const buttonText = document.createTextNode("X");
      button.append(buttonText);
      li.append(button);

      button.addEventListener("click", () => {
        fullList.removeItem(obj.id);
        this.render(fullList);
      });

      this.ul.append(li);
    });
  }
}
