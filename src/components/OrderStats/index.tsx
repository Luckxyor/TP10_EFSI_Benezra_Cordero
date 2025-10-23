import React from "react";
import "./OrderStats.css";

interface OrderStatsProps {
  total: number;
  pending: number;
  shipped: number;
  delivered: number;
}

function OrderStats({ total, pending, shipped, delivered }: OrderStatsProps): React.JSX.Element {
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

export default OrderStats;
