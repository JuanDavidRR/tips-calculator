import { OrderActions } from "../reducers/order-reducer";

const tipOptions = [
  {
    id: "tip-10",
    value: 0.1,
    label: "10%",
  },
  {
    id: "tip-20",
    value: 0.2,
    label: "20%",
  },
  {
    id: "tip-50",
    value: 0.5,
    label: "50%",
  },
];

const waiters = [
  {
    id: "John",
    name: "John",
  },
  {
    id: "Jane",
    name: "Jane",
  },
  {
    id: "Doe",
    name: "Doe",
  },
  {
    id: "Nobody",
    name: "Nobody",
  },
];

type TipFormProps = {
  tip: number;
  waiter: string;
  dispatch: React.Dispatch<OrderActions>;
};

function TipForm({ tip, waiter, dispatch }: TipFormProps) {
  return (
    <div className="mt-10">
      <h3 className="font-black text-2xl">Tip</h3>

      <form className="mt-3">
        {tipOptions.map((tipOption) => (
          <div className="flex gap-2" key={tipOption.id}>
            {/* Using + we convert the value to a number */}
            <input
              id={tipOption.id}
              type="radio"
              name="tip"
              value={tipOption.value}
              onChange={(e) =>
                dispatch({ type: "ADD_TIP", payload: +e.target.value })
              }
              //We can reset the selected option if these values are equal
              checked={tipOption.value === tip}
            />
            <label htmlFor={tipOption.id}>{tipOption.label}</label>
          </div>
        ))}
      </form>

      <h3 className="font-black text-2xl mt-5">Waiters</h3>

      <form className="mt-3">
        {waiters.map((waiterOption) => (
          <div className="flex gap-2" key={waiterOption.id}>
            <input
              id={waiterOption.id}
              type="radio"
              name="waiter"
              value={waiterOption.name}
              onChange={(e) =>
                dispatch({ type: "ADD_WAITER ", payload: e.target.value })
              }
              checked={waiterOption.name === waiter}
            />
            <label htmlFor={waiterOption.id}>{waiterOption.name}</label>
          </div>
        ))}
      </form>
    </div>
  );
}

export default TipForm;
