function DetalleItem({ producto, cantidad, precioUnitario }) {
  const subtotal = cantidad * Number(precioUnitario)
  return (
    <li>
      {producto} x {cantidad} = S/ {subtotal.toFixed(2)}
    </li>
  )
}

export default DetalleItem
