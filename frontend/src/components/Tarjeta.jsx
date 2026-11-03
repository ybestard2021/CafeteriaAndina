function Tarjeta({ titulo, children }) {
  return (
    <section className="card mb-3">
      <div className="card-body">
        <h3 className="card-title h5">{titulo}</h3>
        {children}
      </div>
    </section>
  )
}

export default Tarjeta
