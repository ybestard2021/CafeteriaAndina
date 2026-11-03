// Datos escritos a mano con la forma que entrega la API REST de la Semana 8.
// Productos: campos del serializer (categoria llega como id, precio como cadena).
// Pedidos: cliente y producto llegan como texto (StringRelatedField) y los
// detalles no traen id.

export const productosIniciales = [
  { id: 1, nombre: 'Espresso', precio: '8.50', stock: 25, stock_minimo: 5, disponible: true, categoria: 1 },
  { id: 2, nombre: 'Latte', precio: '12.00', stock: 18, stock_minimo: 6, disponible: true, categoria: 1 },
  { id: 3, nombre: 'Capuccino', precio: '13.50', stock: 10, stock_minimo: 4, disponible: true, categoria: 1 },
  { id: 4, nombre: 'Cheesecake', precio: '18.00', stock: 6, stock_minimo: 3, disponible: true, categoria: 3 },
  { id: 5, nombre: 'Sandwich vegetariano', precio: '15.00', stock: 2, stock_minimo: 4, disponible: false, categoria: 4 },
  { id: 6, nombre: 'Croissant', precio: '7.00', stock: 0, stock_minimo: 6, disponible: true, categoria: 3 },
]

export const pedidosIniciales = [
  {
    id: 101,
    cliente: 'Ana García',
    fecha: '2026-11-03T09:15:00Z',
    estado: 'PENDIENTE',
    total: '31.00',
    detalles: [
      { producto: 'Latte', cantidad: 2, precio_unitario: '12.00' },
      { producto: 'Croissant', cantidad: 1, precio_unitario: '7.00' },
    ],
  },
  {
    id: 102,
    cliente: 'Luis Pérez',
    fecha: '2026-11-03T10:40:00Z',
    estado: 'EN_PREPARACION',
    total: '40.00',
    detalles: [
      { producto: 'Espresso', cantidad: 1, precio_unitario: '8.50' },
      { producto: 'Cheesecake', cantidad: 1, precio_unitario: '18.00' },
      { producto: 'Capuccino', cantidad: 1, precio_unitario: '13.50' },
    ],
  },
]
