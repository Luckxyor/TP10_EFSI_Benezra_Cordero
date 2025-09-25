import React from "react";
import PropTypes from "prop-types";
import "./OrderFilter.css";

function OrderFilter({ filter, onChange }) {
  return (
    <div className="filtro-pedidos">
      <label for="estado">Filtrar por estado:</label>
      <select id="estado" value={filter} onChange={e => onChange(e.target.value)}>
        <option value="">Todos</option>
        <option value="pending">Pendiente</option>
        <option value="shipped">Enviado</option>
        <option value="delivered">Entregado</option>
      </select>
    </div>
  );
}

OrderFilter.propTypes = {
  filter: PropTypes.oneOf(["", "pending", "shipped", "delivered"]),
  onChange: PropTypes.func.isRequired,
};

export default OrderFilter;
