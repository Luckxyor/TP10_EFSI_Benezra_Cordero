
import React, { useState } from "react";
import OrderList from "./components/OrderList";
import OrderFilter from "./components/OrderFilter";
import OrderStats from "./components/OrderStats";
import FormularioPedido from "./components/FormularioPedido";
import "./App.css";

const pedidosIniciales = [
  {
    id: 1,
    customer: "Lanús",
    items: [
      { productId: 101, name: "Conmebol Sudamericana", quantity: 1, price: 2025 }
    ],
    status: "pending",
    date: new Date("2025-09-15"),
  },
  {
    id: 2,
    customer: "Boca Juniors",
    items: [
      { productId: 103, name: "Conmebol Libertadores", quantity: 6, price: 12000 },
    ],
    status: "shipped",
    date: new Date("2025-09-16"),
  },
  {
    id: 3,
    customer: "River Plate",
    items: [
      { productId: 104, name: "Descenso a Primera B Nacional", quantity: 1, price: 2011 },
    ],
    status: "delivered",
    date: new Date("2025-09-17"),
  },
];

function App() {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [filtro, setFiltro] = useState("");

  const pedidosFiltrados = filtro
    ? pedidos.filter((p) => p.status === filtro)
    : pedidos;

  const stats = {
    total: pedidos.length,
    pending: pedidos.filter((p) => p.status === "pending").length,
    shipped: pedidos.filter((p) => p.status === "shipped").length,
    delivered: pedidos.filter((p) => p.status === "delivered").length,
  };

  function agregarPedido(nuevoPedido) {
    setPedidos([...pedidos, nuevoPedido]);
  }

  return (
    <div className="dashboard-pedidos">
      <h1>MailSudamericana - Gestión de Pedidos</h1>
      <OrderStats {...stats} />
      <OrderFilter filter={filtro} onChange={setFiltro} />
      <OrderList orders={pedidosFiltrados} />
      <FormularioPedido onAdd={agregarPedido} />
    </div>
  );
}

export default App;
