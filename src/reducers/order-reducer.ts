import { OrderItem, MenuItem } from "../types";

export type OrderActions =
  | {
      type: "ADD_ORDER";
      payload: { item: MenuItem };
    }
  | {
      type: "REMOVE_ORDER";
      payload: MenuItem["id"];
    }
  | {
      type: "SAVE_ORDER";
    }
  | {
      type: "ADD_TIP";
      payload: number;
    }
  | {
      type: "ADD_WAITER ";
      payload: string;
    };

export type OrderState = {
  orders: OrderItem[];
  tips: number;
  waiter: string;
};

const localStorageOrders = (): OrderItem[] => {
  const localStorage = window.localStorage.getItem("order");
  return localStorage ? JSON.parse(localStorage) : [];
};

export const initialState: OrderState = {
  orders: localStorageOrders(),
  tips: 0,
  waiter: "",
};

export const orderReducer = (
  state: OrderState = initialState,
  action: OrderActions
) => {
  if (action.type === "ADD_ORDER") {
    //Check if the item already exists in the order to avoid duplicates
    const itemExists = state.orders.find(
      (orderItem) => orderItem.id === action.payload.item.id
    );
    let updateOrders: OrderItem[] = [];
    //If the item exist in the order
    if (itemExists) {
      // If exist, map the orders and update the quantity of the item
      updateOrders = state.orders.map((orderItem) => {
        if (orderItem.id === action.payload.item.id) {
          return { ...orderItem, quantity: orderItem.quantity + 1 };
        } else {
          return orderItem;
        }
      }); // Added semicolon here to properly terminate the .map() statement
    } else {
      const newItem: OrderItem = { ...action.payload.item, quantity: 1 };
      updateOrders = [...state.orders, newItem];
    }

    return {
      ...state,
      orders: updateOrders,
    };
  }
  if (action.type === "REMOVE_ORDER") {
    return {
      ...state,
      orders: state.orders.filter(
        (orderItem) => orderItem.id !== action.payload
      ),
    };
  }

  if (action.type === "SAVE_ORDER") {
    return {
      ...state,
      orders: [],
      tips: 0,
      waiter: "",
    };
  }

  if (action.type === "ADD_TIP") {
    return {
      ...state,
      tips: action.payload,
    };
  }

  if (action.type === "ADD_WAITER ") {
    return {
      ...state,
      waiter: action.payload,
    };
  }

  return state;
};
