import { useEffect, useState } from "react";
import { MenuItem, OrderItem } from "../types";

export default function useOrder() {

  const initialOrder = (): OrderItem[] => {
    const localStorage = window.localStorage.getItem("order");
    return localStorage ? JSON.parse(localStorage) : [];
  }
  //Using a generic type to define my order
  const [order, setOrder] = useState<OrderItem[]>(initialOrder);
  const [tip, setTip] = useState(0);
  const [waiter, setWaiter] = useState("");

  //Save the order in the local storage
  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order])
  

  //Add items to the order
  const addItem = (item: MenuItem) => {
    //Check if the item already exists in the order to avoid duplicates
    const itemExists = order.find((orderItem) => orderItem.id === item.id);
    //If the item exist in the order
    if (itemExists) {
      //If exist, map the orders and update the quantity of the item
      const updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
      //Update the order with the new quantity
      setOrder(updatedOrder);
    } else {
      //Id the order does not exist, create a copy of my item and adding quantity to match the type of OrderItem
      const newItem = { ...item, quantity: 1 };
      setOrder([...order, newItem]);
    }
  };

  const deleteItem = (id: MenuItem["id"]) => {
    const removedItem = order.filter((orderItem) => orderItem.id !== id);
    setOrder(removedItem);
  };

  const saveOrder = () => {
    setOrder([]);
    setTip(0);
    setWaiter("");
  };

  return {
    order,
    tip,
    setTip,
    waiter,
    setWaiter,
    addItem,
    deleteItem,
    saveOrder,
  };
}
