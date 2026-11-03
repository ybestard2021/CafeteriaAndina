import Catalogo from './components/Catalogo.jsx'
import PedidoCard from './components/PedidoCard.jsx'
import { pedidosIniciales } from './datos.js'

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Café Andino</span>
          <span className="navbar-text">Administración</span>
        </div>
      </nav>
      <main className="container py-4">
        <Catalogo />
        <h2 className="mt-5 mb-3">Pedidos</h2>
        {pedidosIniciales.map((pedido) => (
          <PedidoCard key={pedido.id} pedido={pedido} />
        ))}
      </main>
    </>
  )
}

export default App
