import React, { useState } from "react";
import PropTypes from "prop-types";
import "./FormularioPedido.css";

function FormularioPedido({ onAdd }) {
  const [cliente, setCliente] = useState("");
  const [estado, setEstado] = useState("pending");
  const [productos, setProductos] = useState([]);
  const [nombreProducto, setNombreProducto] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(0);

  function agregarProducto() {
    if (nombreProducto.length < 1 || cantidad <= 0 || precio <= 0) return;
    setProductos([...productos, {
      productId: Date.now(),
      name: nombreProducto,
      quantity: cantidad,
      price: precio,
    }]);
    setNombreProducto("");
    setCantidad(1);
    setPrecio(0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Solo validar cliente y que haya productos
    if (cliente.length < 3 || productos.length === 0) return;
    onAdd({
      id: Date.now(),
      customer: cliente,
      items: productos,
      status: estado,
      date: new Date(),
    });
    setCliente("");
    setEstado("pending");
    setProductos([]);
    // No modificar los inputs de producto, así se puede enviar aunque estén vacíos o inválidos
  }

  return (
    <form className="formulario-pedido" onSubmit={handleSubmit}>
      <h4 className="titulo-formulario">Nuevo Pedido</h4>
      <label>Cliente:</label>
      <input type="text" value={cliente} onChange={e => setCliente(e.target.value)} minLength={3} required className="input-cliente" />
      <label>Estado:</label>
      <select value={estado} onChange={e => setEstado(e.target.value)} className="select-estado">
        <option value="pending">Pendiente</option>
        <option value="shipped">Enviado</option>
        <option value="delivered">Entregado</option>
      </select>
      <div className="productos-nuevos">
        <label>Producto:</label>
        <input type="text" value={nombreProducto} onChange={e => setNombreProducto(e.target.value)} className="input-producto" />
        <label>Cantidad:</label>
        <input type="number" value={cantidad} min={1} onChange={e => setCantidad(Number(e.target.value))} className="input-cantidad" />
        <label>Precio:</label>
  <input type="number" value={precio} min={0} onChange={e => setPrecio(Number(e.target.value))} className="input-precio" />
        <button type="button" onClick={agregarProducto} className="btn-agregar-producto">Agregar producto</button>
      </div>
      <ul className="lista-productos-nuevos">
        {productos.map(p => (
          <li key={p.productId}>{p.name} - Cantidad: {p.quantity} - Precio: ${p.price}</li>
        ))}
      </ul>
      <button type="submit" className="btn-crear-pedido">Crear pedido</button>
    </form>
  );
}

FormularioPedido.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default FormularioPedido;
