
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import OrderList from "./components/OrderList";
import OrderFilter from "./components/OrderFilter";
import OrderStats from "./components/OrderStats";
import FormularioPedido from "./components/FormularioPedido";
import "./App.css";

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
  status: "pending" | "shipped" | "delivered";
  date: Date;
}

interface Stats {
  total: number;
  pending: number;
  shipped: number;
  delivered: number;
}

const pedidosIniciales: Pedido[] = [
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

function App(): React.JSX.Element {
  const [pedidos, setPedidos] = useState<Pedido[]>(pedidosIniciales);

  function agregarPedido(nuevoPedido: Pedido): void {
    setPedidos([...pedidos, nuevoPedido]);
  }

  return (
    <Router>
      <div className="dashboard-pedidos">
        <nav className="navbar">
          <h1>MailSudamericana - Gestión de Pedidos</h1>
          <ul className="nav-links">
            <li><Link to="/pedidos">Pedidos</Link></li>
            <li><Link to="/nuevo-pedido">Nuevo Pedido</Link></li>
            <li><Link to="/estadisticas">Estadísticas</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/pedidos" replace />} />
          <Route path="/pedidos" element={<PedidosPage pedidos={pedidos} />} />
          <Route path="/nuevo-pedido" element={<NuevoPedidoPage onAdd={agregarPedido} />} />
          <Route path="/estadisticas" element={<EstadisticasPage pedidos={pedidos} />} />
        </Routes>
      </div>
    </Router>
  );
}

function PedidosPage({ pedidos }: { pedidos: Pedido[] }): React.JSX.Element {
  const [filtro, setFiltro] = useState<string | null>(null);

  const pedidosFiltrados = filtro
    ? pedidos.filter((p) => p.status === filtro)
    : pedidos;

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <OrderFilter
        filter={filtro === null ? undefined : filtro as "pending" | "shipped" | "delivered"}
        onChange={(valor: string) => setFiltro(valor === "" ? null : valor)}
      />
      <OrderList orders={pedidosFiltrados} />
    </div>
  );
}

function NuevoPedidoPage({ onAdd }: { onAdd: (pedido: Pedido) => void }): React.JSX.Element {
  return (
    <div>
      <h2>Nuevo Pedido</h2>
      <FormularioPedido onAdd={onAdd} />
    </div>
  );
}

function EstadisticasPage({ pedidos }: { pedidos: Pedido[] }): React.JSX.Element {
  const stats: Stats = {
    total: pedidos.length,
    pending: pedidos.filter((p) => p.status === "pending").length,
    shipped: pedidos.filter((p) => p.status === "shipped").length,
    delivered: pedidos.filter((p) => p.status === "delivered").length,
  };

  return (
    <div>
      <h2>Estadísticas</h2>
      <OrderStats {...stats} />
    </div>
  );
}

export default App;
