import ProductoCard from './ProductoCard.jsx'

function ProductoLista({ productos }) {
  return (
    <table className="table table-striped lista">
      <thead>
        <tr><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
      </thead>
      <tbody>
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
      </tbody>
    </table>
  )
}

export default ProductoLista
