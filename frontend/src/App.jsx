import Catalogo from './components/Catalogo.jsx'
import PedidoCard from './components/PedidoCard.jsx'
import { pedidosIniciales } from './datos.js'

function App() {
  return (
    <main className="contenedor">
      <h1>Café Andino | Administración</h1>
      <Catalogo />
      <h2>Pedidos</h2>
      {pedidosIniciales.map((pedido) => (
        <PedidoCard key={pedido.id} pedido={pedido} />
      ))}
    </main>
  )
}

export default App
