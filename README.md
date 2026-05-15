# DraftWEAR - Proyecto DAW

## Descripción del Proyecto

DraftWEAR es una aplicación web de comercio electrónico especializada en la venta de camisetas de fútbol. El proyecto incluye funcionalidades de catálogo de productos, carrito de compras y sistema de login/registro de usuarios.

## Estructura del Proyecto

```
ProyectoDAW/
├── src/
│   └── main/
│       └── java/
│           └── org/
│               └── example/
|                   ├── config/
|                       ├── ConnectionBBDD.java          # Conexión a PostgreSQL
│                   └── controller/
│                       ├── UsuarioController.java    # Controlador de usuarios
│                       └── CamisetaController.java   # Controlador de camisetas
│                   └── model/
│                       ├── Usuario.java                 # Modelo y operaciones de usuarios
│                       └── Camisetas.java               # Modelo y operaciones de camisetas
│                   ├── Main.java                    # Punto de entrada del servidor HTTP
│                   ├── RouterHandler.java           # Router de endpoints
|                   ├── test/
|                       ├── Camisetas.test          # Test JUnit
│                       └── Usuario.test            # Test JUnit
├── pom.xml                      # Dependencias Maven



├── css/
│   ├── Tienda.css              # Estilos de la tienda y carrito
│   └── Index.css               # Estilos de la página de login
├── html/
│   ├── Index.html              # Página de login/registro
│   ├── Tienda.html             # Catálogo de productos
│   └── carrito.html            # Carrito de compras
├── js/
│   ├── Index.js                # Lógica de login/registro
│   ├── Carrito.js              # Lógica de compras
│   └── Tienda.js               # Lógica de la tienda
├── Img/                        # Imágenes de productos y recursos
└── README.md                   # Este archivo
```

## Entorno Necesario

### Requisitos del Sistema

| Componente | Versión Recomendada | Justificación |
|------------|---------------------|---------------|
| **Java** | JDK 21 | Versión utilizada en el proyecto (maven.compiler.source/target: 21) |
| **PostgreSQL** | 14+ | Sistema de base de datos relacional para almacenar usuarios y camisetas |
| **Maven** | 3.6+ | Gestión de dependencias y build del proyecto Java |
| **Navegador Web** | Chrome/Firefox/Edge (última versión) | Soporte completo de HTML5, CSS3 y ES6+ |
| **Servidor Web** | Python http.server / live-server / PHP | Para servir archivos estáticos del frontend |

### Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Java** | 25 | Lenguaje principal del backend |
| **HttpServer** | (Java estándar) | Servidor HTTP embebido para APIs REST |
| **PostgreSQL JDBC** | 42.7.1 | Driver para conexión a base de datos |
| **Gson** | 2.11.0 | Librería para parseo y generación de JSON |

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **HTML5** | - | Estructura semántica de las páginas |
| **CSS3** | - | Estilos responsive con Grid y Flexbox |
| **JavaScript** | ES6+ | Lógica de interacción del cliente |

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd ProyectoDAW
```

### 2. Configuración de la Base de Datos (PostgreSQL)

**Configurar credenciales en `ConnectionBBDD.java`:**
- URL: `jdbc:postgresql://localhost:5432/ProyectoDAW`
- USER: `postgres`
- PASSWORD: `postgres`

```sql
-- Crear base de datos
CREATE DATABASE ProyectoDAW;

-- LIGA_COMPETICION

CREATE TABLE LIGA_COMPETICION ( id_liga SERIAL PRIMARY KEY, nombre_liga VARCHAR(100) NOT NULL, pais VARCHAR(100) NOT NULL, tipo VARCHAR(20) NOT NULL );
-- EQUIPO

CREATE TABLE EQUIPO ( id_equipo SERIAL PRIMARY KEY, nombre_equipo VARCHAR(100) NOT NULL, id_liga INTEGER NOT NULL, CONSTRAINT fk_equipo_liga FOREIGN KEY (id_liga) REFERENCES LIGA_COMPETICION(id_liga) ON DELETE RESTRICT ON UPDATE CASCADE );
-- MARCA

CREATE TABLE MARCA ( id_marca SERIAL PRIMARY KEY, nombre_marca VARCHAR(100) NOT NULL UNIQUE );
-- TEMPORADA

CREATE TABLE TEMPORADA ( id_temporada SERIAL PRIMARY KEY, anio_inicio INTEGER NOT NULL, anio_fin INTEGER NOT NULL, CONSTRAINT chk_temporada CHECK (anio_fin = anio_inicio + 1) );
-- VERSION

CREATE TABLE VERSION ( id_version SERIAL PRIMARY KEY, tipo_version VARCHAR(20) NOT NULL, descripcion VARCHAR(255), diferencia_precio NUMERIC(10,2) NOT NULL CHECK (diferencia_precio >= 0) );
-- PRODUCTO_CAMISETA

CREATE TABLE PRODUCTO_CAMISETA ( id_producto SERIAL PRIMARY KEY, nombre_producto VARCHAR(150) NOT NULL, id_equipo INTEGER NOT NULL, id_marca INTEGER NOT NULL, id_temporada INTEGER NOT NULL, id_version INTEGER NOT NULL, img VARCHAR(350) NOT NULL, precio_base NUMERIC(10,2) NOT NULL CHECK (precio_base >= 0), CONSTRAINT fk_producto_equipo FOREIGN KEY (id_equipo) REFERENCES EQUIPO(id_equipo) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_producto_marca FOREIGN KEY (id_marca) REFERENCES MARCA(id_marca) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_producto_temporada FOREIGN KEY (id_temporada) REFERENCES TEMPORADA(id_temporada) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_producto_version FOREIGN KEY (id_version) REFERENCES VERSION(id_version) ON DELETE RESTRICT ON UPDATE CASCADE );
-- CAMISETA_UNIDAD

CREATE TABLE CAMISETA_UNIDAD ( id_camiseta_unidad SERIAL PRIMARY KEY, numero_serie VARCHAR(50) NOT NULL UNIQUE, estado VARCHAR(20) NOT NULL DEFAULT 'disponible', id_producto INTEGER NOT NULL, talla VARCHAR(10) NOT NULL, CONSTRAINT fk_unidad_producto FOREIGN KEY (id_producto) REFERENCES PRODUCTO_CAMISETA(id_producto) ON DELETE RESTRICT ON UPDATE CASCADE );
-- CLIENTE

CREATE TABLE CLIENTE ( id_cliente SERIAL PRIMARY KEY, nombre VARCHAR(100) NOT NULL, contrasenia VARCHAR(150) NOT NULL, email VARCHAR(150) NOT NULL, telefono VARCHAR(20), direccion_envio VARCHAR(255) NOT NULL, ciudad VARCHAR(100) NOT NULL, codigo_postal VARCHAR(20) NOT NULL, pais VARCHAR(100) NOT NULL, metodo_pago_preferido VARCHAR(50), fecha_registro TIMESTAMP NOT NULL DEFAULT NOW() );
-- CONDICION_DESCUENTO

CREATE TABLE CONDICION_DESCUENTO ( id_descuento SERIAL PRIMARY KEY, nombre_descuento VARCHAR(100) NOT NULL, descripcion TEXT, porcentaje_descuento NUMERIC(5,2) NOT NULL CHECK (porcentaje_descuento BETWEEN 0 AND 100), fecha_inicio DATE NOT NULL, fecha_fin DATE NOT NULL, activo BOOLEAN NOT NULL DEFAULT TRUE, CONSTRAINT chk_fechas CHECK (fecha_fin >= fecha_inicio) );
-- PEDIDO

CREATE TABLE PEDIDO ( id_pedido INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, id_cliente INTEGER NOT NULL, fecha_pedido TIMESTAMP NOT NULL DEFAULT NOW(), estado VARCHAR(20) NOT NULL DEFAULT 'pendiente', subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0), descuento_aplicado NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (descuento_aplicado >= 0), total NUMERIC(10,2) NOT NULL CHECK (total >= 0), direccion_envio_completa VARCHAR(255) NOT NULL, id_descuento INTEGER, CONSTRAINT fk_pedido_cliente FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_cliente) ON DELETE RESTRICT ON UPDATE CASCADE, CONSTRAINT fk_pedido_descuento FOREIGN KEY (id_descuento) REFERENCES CONDICION_DESCUENTO(id_descuento) ON DELETE SET NULL ON UPDATE CASCADE );
-- LINEA_PEDIDO

CREATE TABLE LINEA_PEDIDO ( id_linea_pedido INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, id_pedido INTEGER NOT NULL, id_camiseta_unidad INTEGER NOT NULL, precio_unitario NUMERIC(10,2) NOT NULL CHECK (precio_unitario >= 0), CONSTRAINT fk_linea_pedido FOREIGN KEY (id_pedido) REFERENCES PEDIDO(id_pedido) ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT fk_linea_unidad FOREIGN KEY (id_camiseta_unidad) REFERENCES CAMISETA_UNIDAD(id_camiseta_unidad) ON DELETE RESTRICT ON UPDATE CASCADE );
-- PERSONALIZACION

CREATE TABLE PERSONALIZACION ( id_personalizacion INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, id_linea_pedido INTEGER NOT NULL UNIQUE, nombre_personalizado VARCHAR(100), numero_personalizado VARCHAR(10), precio_personalizacion NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (precio_personalizacion >= 0), CONSTRAINT fk_personal_linea FOREIGN KEY (id_linea_pedido) REFERENCES LINEA_PEDIDO(id_linea_pedido) ON DELETE CASCADE ON UPDATE CASCADE );


```

``` Inserts
INSERT INTO LIGA_COMPETICION (nombre_liga, pais, tipo) VALUES ('Seleccion', 'mundial', 'seleccion'), ('LaLiga', 'España', 'club'), ('Premier League', 'Inglaterra', 'club'), ('Serie A', 'Italia', 'club'), ('Bundesliga', 'Alemania', 'club');
INSERT INTO EQUIPO (nombre_equipo, id_liga) VALUES ('Seleccion', 1), ('Real Madrid', 2), ('FC Barcelona', 2), ('Sevilla FC', 2), ('Bayern de Múnich', 5), ('Arsenal', 3), ('Milan', 4);

INSERT INTO MARCA (nombre_marca) VALUES ('Nike'), ('Adidas'), ('Puma');

INSERT INTO TEMPORADA (anio_inicio, anio_fin) VALUES (2025, 2026), (2024, 2025), (2023, 2024), (2022, 2023), (2021, 2022), (2020, 2021), (2019, 2020), (2018, 2019), (2017, 2018), (2016, 2017), (2015, 2016), (2014, 2015), (2013, 2014), (2012, 2013), (2011, 2012), (2010, 2011), (2009, 2010), (2008, 2009), (2007, 2008);

INSERT INTO VERSION (tipo_version, descripcion, diferencia_precio) VALUES ('replica', 'Versión estándar para aficionados, corte cómodo.', 0.00), ('authentic', 'Versión de jugador, tejido técnico y corte ajustado.', 20.00);

INSERT INTO PRODUCTO_CAMISETA (nombre_producto, id_equipo, id_marca, id_temporada, id_version, img, precio_base) VALUES ('PRIMERA EQUIPACIÓN REAL MADRID 2024-25', 2, 2, 2, 2, 'https://tnorth.es/cdn/shop/files/RMCFMZ0195-01-1_1.webp?v=1773682744&width=832', 39.99), ('PRIMERA EQUIPACIÓN SEVILLA 2024-2025', 4, 2, 2, 1, 'https://tnorth.es/cdn/shop/files/qeF7zREXHME3ifW.jpg?v=1773683280&width=832', 34.95), ('PRIMERA EQUIPACIÓN BRASIL 2026 | MUNDIAL', 1, 2, 1, 2, 'https://tnorth.es/cdn/shop/files/camiseta-nike-brasil-primera-equipacion-mundial-2026.webp?v=1774617513&width=832',39.99), ('EQUIPACIÓN RETRO FC BARCELONA 2008-09 (FINAL ROMA)', 3, 1, 18, 2, 'https://tnorth.es/cdn/shop/files/camiseta-nike-brasil-primera-equipacion-mundial-2026.webp?v=1774617513&width=832',39.99), ('TERCERA EQUIPACIÓN BAYERN MUNICH 2024-25', 5, 2, 2, 2, 'https://tnorth.es/cdn/shop/files/9H4Tk2Bf75aYrB4.jpg?v=1773683292&width=832',39.99), ('PRIMERA EQUIPACIÓN ARGENTINA 2026 | MUNDIAL', 1, 2, 1, 2, 'https://tnorth.es/cdn/shop/files/JM5897.jpg?v=1773682575&width=832',39.99), ('TERCERA EQUIPACIÓN ARSENAL FC 2025-26', 6, 2, 1, 2, 'https://tnorth.es/cdn/shop/files/iNebZZgEbn4ZouN.jpg?v=1773682590&width=1600',39.99), ('EQUIPACIÓN RETRO AC MILAN 2006-07', 7, 2, 1, 2, 'https://tnorth.es/cdn/shop/files/f2966003-scaled.jpg?v=1773682707&width=832',39.99);```

### 3. Configuración del Backend (Java)

```bash
# Compilar el proyecto con Maven
mvn clean install

# Ejecutar el servidor
mvn exec:java -Dexec.mainClass="org.example.Main"
```

El servidor se iniciará en `http://localhost:8080`

### 4. Configuración del Frontend

El frontend es estático y puede servirse de múltiples formas:

**Opción A: Python (desarrollo)**

```bash
cd html/
python -m http.server 8000
```

**Opción B: Node.js live-server**

```bash
npx live-server html/
```

**Opción C: PHP**

```bash
cd html/
php -S localhost:8000
```

## Herramientas Utilizadas y Justificación

### Backend

** IMPORTANTE**
Para ejecutar el back hay que ir a la rama BackDevelopTerminado y descargarse el código de esa rama

| Herramienta | Justificación |
|-------------|---------------|
| **Java HttpServer** | Servidor HTTP embebido en Java estándar. No requiere dependencias externas para crear un servidor REST básico. Ideal para proyectos académicos |
| **PostgreSQL** | SGBD relacional robusto y open-source. Soporta tipos de datos complejos y es ampliamente utilizado en producción |
| **PostgreSQL JDBC** | Driver oficial para conectar Java con PostgreSQL. Estable y con buen rendimiento |
| **Gson** | Librería de Google para serialización/deserialización JSON. Simple y eficiente para convertir objetos Java a JSON |
| **Maven** | Gestión de dependencias y build automatizado. Estándar en proyectos Java para manejar librerías y compilación |

### Frontend

| Herramienta | Justificación |
|-------------|---------------|
| **Vanilla JavaScript** | Sin dependencias de frameworks pesados. Carga rápida y control total del DOM. Ideal para proyecto académico |
| **CSS Grid & Flexbox** | Layouts modernos y responsive sin necesidad de frameworks como Bootstrap |

### Almacenamiento de Datos

| Herramienta | Justificación |
|-------------|---------------|
| **PostgreSQL** | Almacenamiento persistente de usuarios y camisetas. Soporta transacciones y relaciones entre tablas |

### Desarrollo

| Herramienta | Justificación |
|-------------|---------------|
| **Git** | Control de versiones distribuido. Estándar de la industria |
| **Visual Studio Code** | Editor ligero con extensión para Java, HTML, CSS y JavaScript |

## Endpoints de la API

El backend Java se ejecuta en `http://localhost:8080`:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/user/register` | Registro de nuevos usuarios. Verifica si el usuario ya existe antes de insertar |
| GET | `/stock/camisetas` | Listar todas las camisetas disponibles en la base de datos |

## Funcionalidades Implementadas

- 1. Sistema de login y registro de usuarios
- 2. Catálogo de productos con filtros de búsqueda
- 3. Carrito de compras tipo Amazon (añadir/quitar/eliminar)
- 4. Resumen de pedido con cálculo de totales
- 6. Diseño responsive para móviles
- 7. Animaciones y efectos visuales modernos
- 8. Carrusel de imágenes en la página de login

## Mejoras Futuras

- [ ] Integración con pasarela de pagos (Stripe/PayPal)
- [ ] Panel de administración
- [ ] Historial de pedidos
- [ ] Búsqueda avanzada con filtros múltiples

## Autores

**Ruben** - Desarrollador del backend, base de datos y frontend
**Hugo** - Desarrollador del JUnit y diseño

## Licencia
Este proyecto es de uso académico para el módulo de Desarrollo de Aplicaciones Web.
