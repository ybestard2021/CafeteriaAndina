# Café Andino — Módulo de Administración

Proyecto Django para la administración del negocio Café Andino, desarrollado como proyecto conductor del curso de Desarrollo de Aplicaciones Empresariales. Incluye backend con Django + DRF, vistas MVT con templates, y una primera aplicación React con Vite.

## Requisitos

- Python 3.12+
- Django 5.2.2
- Django REST Framework 3.18.3
- Node.js LTS para el frontend React

## Instalación

### Windows

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py cargar_datos_demo
```

### Linux/macOS

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py cargar_datos_demo
```

## Credenciales de desarrollo

El comando `cargar_datos_demo` crea el usuario administrador si no existe:

- Usuario: `admin`
- Contraseña: `admin123`

## Ejecutar el proyecto

### Backend Django

```bash
python manage.py runserver
```

Abre: `http://127.0.0.1:8000/`

### Frontend React

```bash
cd frontend
npm install
npm run dev
```

Abre: `http://localhost:5173/`

## Estructura principal

```text
cafe_andino/         # proyecto Django
administracion/      # app principal del módulo
    api/              # serializers + viewsets + router
    management/       # comandos Django
    templates/        # plantillas del módulo
    views/            # módulos por funcionalidad
frontend/            # app React con Vite
static/              # archivos estáticos del proyecto
templates/           # base.html y includes
requirements.txt
```

## Reglas de negocio relevantes

- Solo el administrador autenticado accede al módulo.
- Los productos tienen validaciones de precio y stock.
- Las compras se confirman con transacción y actualización de stock usando `F()`.
- Los estados de pedido siguen una transición definida y validada por servicio.
- Los modelos de clientes, pedidos y detalles de pedido son de uso compartido con la app de clientes; el módulo solo los consulta.

## API DRF

La API queda disponible en `/api/`.

### Ejemplos de curl

```bash
curl http://127.0.0.1:8000/api/categorias/
curl -X POST http://127.0.0.1:8000/api/productos/ -H "Content-Type: application/json" -d '{"nombre":"Espresso","precio":"12.50","stock":10,"stock_minimo":2,"categoria":1}'
curl -X PATCH http://127.0.0.1:8000/api/proveedores/1/ -H "Content-Type: application/json" -d '{"telefono":"999888777"}'
curl -X DELETE http://127.0.0.1:8000/api/categorias/1/
```

> La API se deja abierta por defecto (`API_REQUIRE_AUTH=False`) y se puede activar con la variable de entorno `API_REQUIRE_AUTH=True`. Este ajuste se revisa en la Semana 15 según el curso.

## Frontend React

La primera app React es una SPA básica que muestra el panel de administración. El objetivo del curso es conectar React a la API REST de Django en semanas posteriores.

Diagrama conceptual:

```text
React → HTTP → API REST (DRF) → Django → SQLite / BD real
```

### Panel administrativo en React (Semana 10)

Instalar y ejecutar (desde `frontend/`):

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173/`.

Componentes en `frontend/src/components/`:

| Componente | Qué hace |
|---|---|
| `Catalogo` | Contenedor con el estado: lista de productos, buscador y formulario de alta con validación. |
| `ProductoLista` | Dibuja una `ProductoCard` por producto con `map()` y `key`. |
| `ProductoCard` | Muestra nombre, precio y aviso de stock (Agotado / Stock bajo / Stock); botón Activar/Desactivar con estado propio. |
| `Tarjeta` | Marco reutilizable con `titulo` y `children`. |
| `PedidoCard` | Muestra un pedido, su total y el botón Ver/Ocultar detalle (estado propio). |
| `DetalleItem` | Una línea del detalle de un pedido con su subtotal. |

Los datos están escritos a mano en `frontend/src/datos.js` con la forma de la API de la Semana 8. **Todavía no consume la API**: los cambios (productos nuevos, activar/desactivar) se pierden al recargar la página. El administrador solo consulta los pedidos; no se pueden crear desde este panel.

## Semana → tema → código

| Semana | Tema | Lugar principal |
|---|---|---|
| 01-02 | Entorno, proyecto, URLs y vistas | `cafe_andino/urls.py`, `administracion/views/` |
| 03-04 | Modelos y ORM | `administracion/models.py` |
| 05 | Django Admin | `administracion/admin.py` |
| 06 | Templates y CRUD | `templates/`, `administracion/views/` |
| 07 | ORM avanzado y servicios | `administracion/servicios.py`, `administracion/models.py` |
| 08 | DRF + API | `administracion/api/` |
| 09 | React + Vite | `frontend/` |

## Trazabilidad REQ → HU → vista/URL/endpoint → tests

| Requisito / historia | Vista / URL / endpoint | Verificación |
|---|---|---|
| RB-01 autenticación | `LoginRequiredMixin`, rutas protegidas | `manage.py check` |
| HU-002 categorías | `/categorias/` | plantillas + views |
| HU-003 productos | `/productos/` | CRUD y validaciones |
| HU-004 proveedores | `/proveedores/` | CRUD y protegidos |
| HU-005 compras | `/compras/` + confirmar | `confirmar_compra()` |
| HU-006 / HU-007 pedidos | `/pedidos/` y `/pedidos/<id>/` | servicio `cambiar_estado_pedido()` |
| HU-008 búsquedas y filtros | GET en listados | formularios + queryset |
| HU-009 stock | `/stock/` | queryset `con_stock_bajo()` |
| HU-010 reportes | `/reportes/*` | agregaciones y annotates |
| API REST | `/api/*` | DRF ViewSets |
| React | `frontend/` | `npm run dev` |
| Pruebas | `administracion/tests.py` | `python manage.py test` |

## Notas para el docente

- S09: el material menciona `create-react-app`, pero el proyecto usa Vite y `App.jsx`.
- S07 y S08 usan dos estados en el material original, pero el proyecto sigue la definición con cinco estados del enunciado de Café Andino.
- S07 muestra creación de pedidos con `transaction.atomic()`, pero en este proyecto la creación del pedido corresponde a la app de clientes y la técnica se aplica a la confirmación de compras.
- S08 debe dejar la API abierta hasta la Semana 15; aquí se resuelve con `API_REQUIRE_AUTH` por defecto en `False` para respetar la tensión del curso y el alcance del módulo.
- S05 menciona modelos adicionales no previstos en este proyecto; aquí solo se usa `ForeignKey` según el alcance del dominio.

## Verificación final

Ejecuta:

```bash
python manage.py check
python manage.py test
```

y para arrancar el servidor:

```bash
python manage.py runserver
```
