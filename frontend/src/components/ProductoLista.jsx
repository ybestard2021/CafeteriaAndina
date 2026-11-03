import ProductoCard from './ProductoCard.jsx'

function ProductoLista({ productos }) {
  return (
    <ul className="lista">
      {productos.map((p) => (
        <ProductoCard
          key={p.id}
          nombre={p.nombre}
          precio={p.precio}
          stock={p.stock}
          stockMinimo={p.stock_minimo}
          disponible={p.disponible}
        />
      ))}
    </ul>
  )
}

export default ProductoLista
