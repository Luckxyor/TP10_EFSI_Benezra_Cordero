import React from "react";
import PropTypes from "prop-types";
import "./OrderItem.css";

function OrderItem({ id, customer, items, status, date }) {
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

OrderItem.propTypes = {
  id: PropTypes.number.isRequired,
  customer: function(props, propName, componentName) {
    if (!props[propName] || typeof props[propName] !== "string" || props[propName].length < 3) {
      return new Error(`Prop '${propName}' en '${componentName}' debe ser string y mínimo 3 caracteres.`);
    }
  },
  items: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: function(obj, propName, componentName) {
        if (typeof obj[propName] !== "number" || obj[propName] <= 0) {
          return new Error(`Prop '${propName}' en '${componentName}' debe ser mayor a 0.`);
        }
      },
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  status: PropTypes.oneOf(["pending", "shipped", "delivered"]),
  date: PropTypes.instanceOf(Date),
};

OrderItem.defaultProps = {
  status: "pending",
  date: new Date(),
};

export default OrderItem;
