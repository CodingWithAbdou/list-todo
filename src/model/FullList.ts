import ListItem from "./ListItem.ts";

interface List {
  list: ListItem[];
  save(): void;
  clearList(): void;
  addItem(objectItem: ListItem): void;
  removeItem(index: string): void;
  load(): void;
}

export default class FullList implements List {
  public get list(): ListItem[] {
    return this._list;
  }

  public set list(value: ListItem[]) {
    this._list = value;
  }

  //Becuase we  Have one List In Application, Uses Static Intstance & private Constructer
  static getInstance: FullList = new FullList();
  constructor(private _list: ListItem[] = []) {}

  load(): void {
    const localStringy: string | null = localStorage.getItem("list");
    if (typeof localStringy != "string") return;

    const localPrased: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(localStringy);

    localPrased.forEach((obj) => {
      const newList = new ListItem(obj._id, obj._item, obj._checked);
      FullList.getInstance.addItem(newList);
    });
  }

  save(): void {
    localStorage.setItem("list", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(objectItem: ListItem): void {
    this._list.push(objectItem);
    this.save();
  }

  removeItem(index: string): void {
    this._list = this._list.filter((e) => e.id != index);
    this.save();
  }
}
