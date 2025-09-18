import React from "react";
import PropTypes from "prop-types";
import OrderItem from "../OrderItem";
import "./OrderList.css";

function OrderList({ orders }) {
  return (
    <div className="lista-pedidos">
      {orders.map((pedido) => (
        <OrderItem key={pedido.id} {...pedido} />
      ))}
    </div>
  );
}

OrderList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    customer: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    status: PropTypes.oneOf(["pending", "shipped", "delivered"]),
    date: PropTypes.instanceOf(Date),
  })).isRequired,
};

export default OrderList;
