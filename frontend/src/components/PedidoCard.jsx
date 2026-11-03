import { useState } from 'react'
import Tarjeta from './Tarjeta.jsx'
import DetalleItem from './DetalleItem.jsx'

function PedidoCard({ pedido }) {
  const [verDetalle, setVerDetalle] = useState(false)

  const total = pedido.detalles.reduce(
    (suma, d) => suma + d.cantidad * Number(d.precio_unitario), 0)

  return (
    <Tarjeta titulo={`Pedido ${pedido.id} — ${pedido.cliente}`}>
      <p>Estado: {pedido.estado} · {pedido.detalles.length} línea(s)</p>
      <button onClick={() => setVerDetalle(!verDetalle)}>
        {verDetalle ? 'Ocultar detalle' : 'Ver detalle'}
      </button>
      {verDetalle && (
        <ul>
          {pedido.detalles.map((d) => (
            <DetalleItem
              key={d.producto}
              producto={d.producto}
              cantidad={d.cantidad}
              precioUnitario={d.precio_unitario}
            />
          ))}
        </ul>
      )}
      <p>Total: S/ {total.toFixed(2)}</p>
    </Tarjeta>
  )
}

export default PedidoCard
