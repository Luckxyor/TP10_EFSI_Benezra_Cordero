import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./OrderStats.css";

interface OrderStatsProps {
  total: number;
  pending: number;
  shipped: number;
  delivered: number;
}

function OrderStats({ total, pending, shipped, delivered }: OrderStatsProps): React.JSX.Element {
  const pieData = [
    { name: "Pendientes", value: pending },
    { name: "Enviados", value: shipped },
    { name: "Entregados", value: delivered },
  ];

  const barData = [
    { name: "Pendientes", cantidad: pending },
    { name: "Enviados", cantidad: shipped },
    { name: "Entregados", cantidad: delivered },
  ];

  const COLORS = ["#ff9800", "#2196f3", "#4caf50"];

  const renderLabel = (entry: any) => {
    const RADIAN = Math.PI / 180;
    const radius = entry.innerRadius + (entry.outerRadius - entry.innerRadius) * 0.5;
    const x = entry.cx + radius * Math.cos(-entry.midAngle * RADIAN);
    const y = entry.cy + radius * Math.sin(-entry.midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > entry.cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="14"
        fontWeight="bold"
      >
        {`${entry.payload.name}: ${(entry.percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="estadisticas-pedidos">
      <div className="stats-summary">
        <h4 className="titulo-estadisticas">Estadísticas Generales</h4>
        <ul className="lista-estadisticas">
          <li>Total de pedidos: <span className="total-pedidos">{total}</span></li>
          <li>Pendientes: <span className="pendientes-pedidos">{pending}</span></li>
          <li>Enviados: <span className="enviados-pedidos">{shipped}</span></li>
          <li>Entregados: <span className="entregados-pedidos">{delivered}</span></li>
        </ul>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h4>Distribución de Estados</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={false}
                outerRadius={100}
                innerRadius={0}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} pedidos`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-wrapper">
          <h4>Cantidad por Estado</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default OrderStats;

