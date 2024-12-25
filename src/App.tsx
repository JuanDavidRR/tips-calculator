import { useState } from "react";
import { menuItems } from "./data/db";
import MenuItem from "./components/MenuItem";
import useOrder from "./hooks/useOrder";
import OrderContents from "./components/OrderContents";
import OrderTotals from "./components/OrderTotals";
import TipForm from "./components/TipForm";

function App() {
  const [item] = useState(menuItems);
  const {
    order,
    addItem,
    deleteItem,
    tip,
    setTip,
    waiter,
    setWaiter,
    saveOrder,
  } = useOrder();
  return (
    <>
      <header className="bg-slate-950 p-10 text-center text-white">
        <h1 className="text-4xl font-extrabold uppercase ">Tip$ calculator</h1>
        <p className="pt-3">
          Track your consume and let some tips to the waiters
        </p>
      </header>

      <main className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 py-10 px-5">
        <section className="flex-1 border border-dashed border-slate-500 p-5 rounded-xl">
          <h2 className="font-black text-4xl">Menu</h2>
          <p className="my-5">
            Select your dish and if you want the same dish several times, click
            on it the amount of times you want.
          </p>
          <article className="space-y-4">
            {item.map((item) => (
              <MenuItem key={item.id} item={item} addItem={addItem} />
            ))}
          </article>
        </section>
        <section className="flex-1 border border-dashed border-slate-500 p-5 rounded-xl">
          {order.length > 0 ? (
            <>
              <OrderContents order={order} deleteItem={deleteItem} />
              <TipForm
                setTip={setTip}
                tip={tip}
                waiter={waiter}
                setWaiter={setWaiter}
              />
              <OrderTotals
                order={order}
                tip={tip}
                waiter={waiter}
                saveOrder={saveOrder}
              />
            </>
          ) : (
            <section className="text-center">
              <h3 className="text-2xl font-black">The order is empty</h3>
              <p>Select something on the menu to order to start</p>
            </section>
          )}
        </section>
      </main>
    </>
  );
}

export default App;
