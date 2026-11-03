import { useState } from 'react'

function ProductoCard({ nombre, precio, stock = 0, stockMinimo = 0, disponible = true }) {
  const [activo, setActivo] = useState(disponible)

  return (
    <li>
      {nombre} — S/ {Number(precio).toFixed(2)}
      {stock === 0 && <span> Agotado</span>}
      {stock > 0 && stock < stockMinimo && <span> Stock bajo ({stock})</span>}
      {stock >= stockMinimo && stock > 0 && <span> Stock: {stock}</span>}
      {!activo && <span> No disponible</span>}
      <button onClick={() => setActivo(!activo)} disabled={stock === 0}>
        {activo ? 'Desactivar' : 'Activar'}
      </button>
    </li>
  )
}

export default ProductoCard
