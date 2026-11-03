import { useState } from 'react'
import Tarjeta from './Tarjeta.jsx'
import DetalleItem from './DetalleItem.jsx'

function PedidoCard({ pedido }) {
  const [verDetalle, setVerDetalle] = useState(false)

  const total = pedido.detalles.reduce(
    (suma, d) => suma + d.cantidad * Number(d.precio_unitario), 0)

  return (
    <Tarjeta titulo={`Pedido ${pedido.id} — ${pedido.cliente}`}>
      <p className="mb-2">
        <strong>Estado:</strong> <span className="badge text-bg-primary">{pedido.estado}</span>
        {' '}· {pedido.detalles.length} línea(s)
      </p>
      <button className="btn btn-sm btn-outline-primary mb-3" onClick={() => setVerDetalle(!verDetalle)}>
        {verDetalle ? 'Ocultar detalle' : 'Ver detalle'}
      </button>
      {verDetalle && (
        <table className="table table-sm">
          <thead>
            <tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Subtotal</th></tr>
          </thead>
          <tbody>
            {pedido.detalles.map((d) => (
              <DetalleItem
                key={d.producto}
                producto={d.producto}
                cantidad={d.cantidad}
                precioUnitario={d.precio_unitario}
              />
            ))}
          </tbody>
        </table>
      )}
      <p className="mb-0"><strong>Total:</strong> S/ {total.toFixed(2)}</p>
    </Tarjeta>
  )
}

export default PedidoCard
