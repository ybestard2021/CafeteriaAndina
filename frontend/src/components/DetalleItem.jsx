function DetalleItem({ producto, cantidad, precioUnitario }) {
  const subtotal = cantidad * Number(precioUnitario)
  return (
    <tr>
      <td>{producto}</td>
      <td>{cantidad}</td>
      <td>S/ {Number(precioUnitario).toFixed(2)}</td>
      <td>S/ {subtotal.toFixed(2)}</td>
    </tr>
  )
}

export default DetalleItem
