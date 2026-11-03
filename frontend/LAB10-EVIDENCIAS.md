# Laboratorio 10 — Evidencias (Componentes y Eventos I)

Borrador para copiar al Word de entrega. Reescribe las respuestas con tus palabras.

## 1. Ej. 9 — Tabla de planificación

| Elemento | Decisión |
|---|---|
| Entidad principal | **Producto** |
| Segunda entidad | **Pedido** (creado por clientes; el módulo solo lo consulta) |
| Relación 1:N | **Pedido → DetallePedido**, con componentes anidados (`PedidoCard` → `Tarjeta` → `DetalleItem`) |
| Campo de búsqueda | `nombre` del producto |
| Campos del formulario de alta | `nombre` (texto) y `precio` (numérico) |
| Validaciones | 1) `nombre` obligatorio (con `trim()`); 2) `precio` mayor que cero |
| Botón con estado | **Activar / Desactivar** en la tarjeta del producto (cambia un dato local) |
| `disabled` | Botón deshabilitado cuando `stock === 0` (regla **didáctica**, no una regla de negocio oficial) |
| Producto nuevo | `stock: 0`, `stock_minimo: 5`, `disponible: true`, `categoria: 1` (valores del prototipo; en el sistema real el `id` lo asigna el backend) |
| Avisos en la tarjeta | «Agotado» si `stock === 0`; «Stock bajo (n)» si `0 < stock < stock_minimo`; «Stock: n» en otro caso; «No disponible» si está desactivado |

## 2. Respuestas redactadas (borrador)

**Ej. 1 — ¿Por qué el nombre del componente empieza con mayúscula?**
React distingue los componentes de las etiquetas HTML por la mayúscula inicial: `<ProductoCard />` es un componente, `<producto />` sería una etiqueta desconocida del navegador. Se parece a `{% include %}` de los Templates de Django: un fragmento de interfaz reutilizable que se inserta donde se necesita, con la diferencia de que el componente recibe datos y puede tener estado.

**Ej. 2 — ¿Qué cumplía el papel de las props en Django?**
El `context` que la View entrega al Template. Las props son los datos que el componente padre entrega al hijo (`nombre`, `precio`, `stock`…), y el hijo solo las lee.

**Ej. 5 — Error de las props de solo lectura**
Mensaje real en la consola: `Uncaught TypeError: Cannot assign to read only property 'stock' of object '#<Object>'` (en el componente temporal `Mal`, que hacía `props.stock = 0`). Ocurre porque las props son de solo lectura: el hijo no puede modificar lo que le entrega el padre. Un dato que cambia debe guardarse en el **estado** (`useState`). El componente temporal fue eliminado.

**Ej. 6 — ¿Por qué con `let` la pantalla no cambia?**
Con `let n = 0` y `n = n + 1` la variable sí cambia (la consola mostró `n = 1`, `n = 2`, `n = 3`), pero React no se entera del cambio y no vuelve a ejecutar el componente, así que la pantalla sigue mostrando 0. Además, cada ejecución del componente reinicia la variable local. Solo `setActivo(...)` / `useState` avisa a React que debe redibujar.

**Ej. 8 — Diferencia entre props y estado**
Las props llegan desde afuera (las entrega el padre) y son de solo lectura; el estado pertenece al componente, persiste entre dibujos y cambia con su función `set...`. Ejemplo del panel: clic en «Desactivar» → `setActivo(!activo)` → React vuelve a ejecutar `ProductoCard` → aparece «No disponible» y el botón dice «Activar».

**Ej. 11 — ¿Por qué sigue siendo necesaria la validación del servidor?**
Porque cualquiera puede llamar a la API sin pasar por React (curl, Postman, otra aplicación). La validación de React solo mejora la experiencia del usuario; la regla definitiva está en el backend (`validate_precio` en el serializer) y la base de datos es compartida con la app de clientes.

## 3. Salida de lint y build

```text
> frontend@0.0.0 lint
> oxlint
(sin salida, código de salida 0)

> frontend@0.0.0 build
> vite build

vite v8.3.4 building client environment for production...
✓ 24 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/index-5dNLr_c_.css  230.58 kB │ gzip: 31.03 kB
dist/assets/index-BkrqRN5g.js   223.41 kB │ gzip: 69.98 kB
✓ built in 1.15s
```

## 4. Resultados de búsquedas y formulario

Búsquedas (ej. 7):

| Texto | Resultado |
|---|---|
| `CA` | 2 productos: Capuccino, Cheesecake |
| `lat` | 1 producto: Latte |
| `zzz` | ninguno; aparece «No hay productos que coincidan.» |

Formulario (ej. 10 y 11):

| Caso | Escrito | Resultado |
|---|---|---|
| Campos vacíos | nombre vacío, precio vacío | «El nombre es obligatorio.»; la lista sigue con 6 |
| Precio ≤ 0 | `  Alfajor `, precio `0` | «El precio debe ser mayor que cero.»; la lista sigue con 6 |
| Válido | `  Alfajor `, precio `3.5` | La lista pasa de 6 a 7 («Alfajor — S/ 3.50 Agotado»), campos vacíos y sin error |

Otras comprobaciones:
- Botón Desactivar en Espresso → «No disponible» y el botón pasa a «Activar»; el resto de tarjetas no cambia (estado independiente).
- Croissant (`stock: 0`) muestra «Agotado» y su botón está deshabilitado.
- Con el arreglo de productos vacío el panel sigue funcionando (muestra «No hay productos que coincidan.» y los pedidos).
- Pedido 101: Latte x 2 = 24.00 + Croissant x 1 = 7.00 → Total S/ 31.00. Pedido 102: total S/ 40.00. No hay ningún botón para crear pedidos.
- Consola del navegador sin advertencias con el panel final.

## 5. Supuestos y decisiones

Nombres reales tomados de `administracion/models.py` y `administracion/api/serializers.py`:

- **Producto**: `id`, `nombre`, `descripcion`, `precio` (llega como **cadena**), `stock`, `stock_minimo`, `disponible`, `categoria` (**id**).
- **Pedido**: `id`, `cliente` (**texto**, `StringRelatedField`), `fecha`, `estado`, `total`, `detalles`.
- **Detalle**: `producto` (**texto con el nombre**, no id), `cantidad`, `precio_unitario`. **No trae `id`.**
- **Estados reales**: `PENDIENTE`, `EN_PREPARACION`, `LISTO`, `ENTREGADO`, `CANCELADO` (en los datos se usan `PENDIENTE` y `EN_PREPARACION`).

Diferencias respecto al documento de instrucciones:
- `cliente` y `producto` ya llegan como texto, por eso `PedidoCard` no recibe la lista de productos ni usa `find`.
- Como el detalle no trae `id`, el `key` de `DetalleItem` es el nombre del producto (único dentro de cada pedido de los datos).
- El título del pedido muestra el nombre del cliente en lugar de «Cliente <id>».
- Los productos de `datos.js` usan nombres de `cargar_datos_demo.py`; el stock de Croissant es `0` (en la demo es 20) para poder mostrar «Agotado» y el botón deshabilitado.
- El total del pedido se calcula en JavaScript a partir de las líneas (no se usa el campo `total` de la API).
- No se instaló Vitest ni otras librerías: las pruebas se hicieron manualmente en el navegador.

## 6. Capturas que debe tomar el usuario

- **Ej. 1:** estructura de carpetas y página con dos tarjetas.
- **Ej. 2:** tarjeta sin `stock` mostrando «Agotado».
- **Ej. 3:** página con la lista y estructura de `src`.
- **Ej. 4:** pedido con detalle y total.
- **Ej. 5:** error de consola.
- **Ej. 6:** tarjeta tras varios clics, con dos tarjetas independientes.
- **Ej. 7:** tres búsquedas.
- **Ej. 8 y 13:** salida de `npm run lint`, `npm run build` y consola limpia.
- **Ej. 10 y 11:** lista antes y después, y los dos mensajes de error.
- **Ej. 12:** panel completo.

Nota: el código temporal de los ej. 5 y 6 ya fue eliminado; para las capturas de esos ejercicios hay que recrearlo (un componente que haga `props.stock = 0` y un contador con `let`).
