import { useState } from 'react'
import ProductoLista from './ProductoLista.jsx'
import { productosIniciales } from '../datos.js'

function Catalogo() {
  const [productos, setProductos] = useState(productosIniciales)
  const [buscar, setBuscar] = useState('')
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState('')
  const [error, setError] = useState('')

  const visibles = productos.filter((p) =>
    p.nombre.toLowerCase().includes(buscar.toLowerCase()))

  function agregarProducto(e) {
    e.preventDefault()
    if (nombre.trim() === '') {
      setError('El nombre es obligatorio.')
      return
    }
    if (Number(precio) <= 0) {
      setError('El precio debe ser mayor que cero.')
      return
    }
    const nuevo = {
      id: Date.now(), nombre: nombre.trim(), precio: Number(precio).toFixed(2),
      stock: 0, stock_minimo: 5, disponible: true, categoria: 1,
    }
    setProductos([...productos, nuevo])
    setNombre('')
    setPrecio('')
    setError('')
  }

  return (
    <section>
      <h2 className="mb-3">Productos</h2>
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Buscar producto"
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
          />
        </div>
      </div>
      {visibles.length === 0 && (
        <div className="alert alert-secondary">No hay productos que coincidan.</div>
      )}
      <ProductoLista productos={visibles} />

      <h3 className="h5 mt-4">Nuevo producto</h3>
      <form className="row g-2" onSubmit={agregarProducto}>
        <div className="col-md-4">
          <input className="form-control" placeholder="Nombre" value={nombre}
                 onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="col-md-3">
          <input className="form-control" type="number" placeholder="Precio" value={precio}
                 onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary" type="submit">Registrar producto</button>
        </div>
      </form>
      {error && <div className="alert alert-danger mt-3 error">{error}</div>}
    </section>
  )
}

export default Catalogo
