import React from "react";
import "./OrderItem.css";

interface Item {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

interface OrderItemProps {
  id: number;
  customer: string;
  items: Item[];
  status?: "pending" | "shipped" | "delivered";
  date?: Date;
}

function OrderItem({ id, customer, items, status = "pending", date = new Date() }: OrderItemProps): React.JSX.Element {
  return (
    <div className="pedido-item" id={`pedido-${id}`}>
      <h3 className="titulo-pedido">Pedido #{id}</h3>
      <p className="dato-cliente"><strong>Cliente:</strong> {customer}</p>
      <p className="dato-fecha"><strong>Fecha:</strong> {date.toLocaleDateString()}</p>
      <span className={`estado-pedido estado-${status}`}>{status}</span>
      <ul className="lista-productos">
        {items.map((producto) => (
          <li key={producto.productId} className="producto-item">
            <span className="nombre-producto">{producto.name}</span>
            <span className="cantidad-producto">x{producto.quantity}</span>
            <span className="precio-producto">${producto.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderItem;
