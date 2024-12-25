export type MenuItem = {
  id: number;
  name: string;
  price: number;
};

//inherit everything from Menu item and adding quantity
export type OrderItem = MenuItem & {
  quantity: number;
};
