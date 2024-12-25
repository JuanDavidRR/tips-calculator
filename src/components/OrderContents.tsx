import { formatCurrency } from "../helpers";
import type { MenuItem, OrderItem } from "../types";

type OrderItemProps = {
  order: OrderItem[];
  deleteItem: (id: MenuItem["id"]) => void;
};

function OrderContents({ order, deleteItem }: OrderItemProps) {
  return (
    <section>
      <h2 className="font-black text-4xl">Consume</h2>
      {/* If it's empty, show the warning. Otherwise, map over the order array and display the name and quantity of each item in the order. */}
      <section className="mt-10">
        {order.map((item) => (
          <article
            key={item.id}
            className="flex items-center justify-between border-t border-slate-400 py-5 last-of-type:border-b"
          >
            <div>
              <p className="text-lg">
                {item.name} - {formatCurrency(item.price)}
              </p>
              <p className="font-black">
                Quantity: {item.quantity} - {""}
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
            <button
              onClick={() => deleteItem(item.id)}
              className="bg-red-600 w-8 leading-7 grid h-8 rounded-full font-black text-white"
            >
              x
            </button>
          </article>
        ))}
      </section>
    </section>
  );
}

export default OrderContents;
