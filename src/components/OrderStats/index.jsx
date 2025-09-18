import React from "react";
import PropTypes from "prop-types";
import "./OrderStats.css";

function OrderStats({ total, pending, shipped, delivered }) {
  return (
    <div className="estadisticas-pedidos">
      <h4 className="titulo-estadisticas">Estadísticas Generales</h4>
      <ul className="lista-estadisticas">
        <li>Total de pedidos: <span className="total-pedidos">{total}</span></li>
        <li>Pendientes: <span className="pendientes-pedidos">{pending}</span></li>
        <li>Enviados: <span className="enviados-pedidos">{shipped}</span></li>
        <li>Entregados: <span className="entregados-pedidos">{delivered}</span></li>
      </ul>
    </div>
  );
}

OrderStats.propTypes = {
  total: PropTypes.number.isRequired,
  pending: PropTypes.number.isRequired,
  shipped: PropTypes.number.isRequired,
  delivered: PropTypes.number.isRequired,
};

export default OrderStats;
