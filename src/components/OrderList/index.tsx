import React from "react";
import OrderItem from "../OrderItem";
import "./OrderList.css";

interface Item {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

interface Pedido {
  id: number;
  customer: string;
  items: Item[];
  status?: "pending" | "shipped" | "delivered";
  date?: Date;
}

interface OrderListProps {
  orders: Pedido[];
}

function OrderList({ orders }: OrderListProps): React.JSX.Element {
  return (
    <div className="lista-pedidos">
      {orders.map((pedido) => (
        <OrderItem key={pedido.id} {...pedido} />
      ))}
    </div>
  );
}

export default OrderList;
