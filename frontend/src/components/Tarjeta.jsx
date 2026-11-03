function Tarjeta({ titulo, children }) {
  return (
    <section className="tarjeta">
      <h3 className="h5">{titulo}</h3>
      {children}
    </section>
  )
}

export default Tarjeta
