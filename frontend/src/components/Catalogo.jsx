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
      <h2>Productos</h2>
      <input
        placeholder="Buscar producto"
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
      />
      {visibles.length === 0 && <p>No hay productos que coincidan.</p>}
      <ProductoLista productos={visibles} />

      <form onSubmit={agregarProducto}>
        <input placeholder="Nombre" value={nombre}
               onChange={(e) => setNombre(e.target.value)} />
        <input type="number" placeholder="Precio" value={precio}
               onChange={(e) => setPrecio(e.target.value)} />
        <button type="submit">Registrar producto</button>
      </form>
      {error && <p className="error">{error}</p>}
    </section>
  )
}

export default Catalogo
