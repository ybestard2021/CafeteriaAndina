import { useState } from 'react'

function ProductoCard({ nombre, precio, stock = 0, stockMinimo = 0, disponible = true }) {
  const [activo, setActivo] = useState(disponible)
  const stockBajo = stock > 0 && stock < stockMinimo

  return (
    <tr className={stockBajo ? 'table-warning' : ''}>
      <td>{nombre}</td>
      <td>S/ {Number(precio).toFixed(2)}</td>
      <td>
        {stock === 0 && <span className="badge text-bg-danger">Agotado</span>}
        {stockBajo && <span className="badge text-bg-warning">Stock bajo ({stock})</span>}
        {stock >= stockMinimo && stock > 0 && <span>Stock: {stock}</span>}
        {!activo && <span className="badge text-bg-secondary ms-2">No disponible</span>}
      </td>
      <td>
        <button
          className={activo ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-success'}
          onClick={() => setActivo(!activo)}
          disabled={stock === 0}
        >
          {activo ? 'Desactivar' : 'Activar'}
        </button>
      </td>
    </tr>
  )
}

export default ProductoCard
