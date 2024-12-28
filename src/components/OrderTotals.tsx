import { useMemo } from "react";
import { OrderItem } from "../types";
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/order-reducer";

type OrderTotalProps = {
  order: OrderItem[];
  tip: number;
  dispatch: React.Dispatch<OrderActions>;
  waiter: string;
};

function OrderTotals({ order, tip, dispatch, waiter }: OrderTotalProps) {
  //Getting the subtotal calculation
  const subtotalCalc = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  //Getting the subtotal + the tip
  const tipAmount = useMemo(() => subtotalCalc * tip, [tip, subtotalCalc]);

  //Gettingn the total
  const total = useMemo(
    () => subtotalCalc + tipAmount,
    [subtotalCalc, tipAmount]
  );

  const isWaiterSelected = waiter ? waiter : "Not selected";

  return (
    <>
      <section className="space-y-4 mt-10">
        <h2 className="font-black text-2xl">Totals and tips</h2>
        <p>
          Subtotal:{" "}
          <span className="font-bold">{formatCurrency(subtotalCalc)}</span>
        </p>
        <p>
          Tips: <span className="font-bold">{formatCurrency(tipAmount)}</span>
        </p>
        <p>
          Waiter: <span className="font-bold">{isWaiterSelected}</span>
        </p>
        <p>
          Total: <span className="font-bold">{formatCurrency(total)}</span>
        </p>
      </section>
      <button
        className="w-full p-3 uppercase bg-slate-950 text-white font-bold mt-10 disabled:opacity-30"
        disabled={total === 0}
        onClick={() => dispatch({ type: "SAVE_ORDER" })}
      >
        Save order
      </button>
    </>
  );
}

export default OrderTotals;
