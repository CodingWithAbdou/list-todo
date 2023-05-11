import "./css/style.css";
import ListItem from "./model/ListItem";
import FullList from "./model/FullList";
import ListTemplate from "./templates/ListTemplate";

const createApp = (): void => {
  const [fullList, listTemplate] = [
    FullList.getInstance,
    ListTemplate.getInstance,
  ];

  const formElement = <HTMLFormElement>document.getElementById("itemEntryForm"),
    btnClearList = <HTMLButtonElement>(
      document.getElementById("clearItemsButton")
    );

  formElement.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();
    const InputNewItem = <HTMLInputElement>document.getElementById("newItem");
    const newtext = InputNewItem.value.trim();

    if (!newtext.length) return;

    const IdForItems = !fullList.list.length
      ? 1
      : Number(fullList.list[fullList.list.length - 1].id) + 1;

    const newItem = new ListItem(IdForItems.toString(), newtext);

    fullList.addItem(newItem);
    listTemplate.render(fullList);
    InputNewItem.value = "";
  });

  btnClearList.addEventListener("click", (): void => {
    fullList.clearList();
    listTemplate.clear();
  });
  fullList.load();
  listTemplate.render(fullList);
};

document.addEventListener("DOMContentLoaded", createApp);
