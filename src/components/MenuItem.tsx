import type { MenuItem } from "../types";

type MenuItemProps = {
  item: MenuItem;
  addItem: (item: MenuItem) => void;
};

function MenuItem({ item, addItem }: MenuItemProps) {
  return (
    <button
      onClick={() => addItem(item)}
      className="border-2 border-slate-950 hover:bg-slate-900 hover:text-white duration-200 p-4 w-full flex justify-between rounded-xl"
    >
      <h2>{item.name}</h2>
      <p className="font-black">${item.price}</p>
    </button>
  );
}

export default MenuItem;
