import React from "react";
import "./OrderFilter.css";

interface OrderFilterProps {
  filter?: "pending" | "shipped" | "delivered";
  onChange: (value: string) => void;
}

function OrderFilter({ filter, onChange }: OrderFilterProps): React.JSX.Element {
  return (
    <div className="filtro-pedidos">
      <label htmlFor="estado">Filtrar por estado:</label>
      <select
        id="estado"
        value={filter ?? ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="pending">Pendiente</option>
        <option value="shipped">Enviado</option>
        <option value="delivered">Entregado</option>
      </select>
    </div>
  );
}

export default OrderFilter;
