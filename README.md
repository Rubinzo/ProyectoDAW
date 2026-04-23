# FutbolCamis - Proyecto DAW

## Descripción del Proyecto

FutbolCamis es una aplicación web de comercio electrónico especializada en la venta de camisetas de fútbol. El proyecto incluye funcionalidades de catálogo de productos, carrito de compras y sistema de login/registro de usuarios.

## Estructura del Proyecto

```
ProyectoDAW/
├── src/
│   └── main/
│       └── java/
│           └── org/
│               └── example/
│                   ├── Main.java                    # Punto de entrada del servidor HTTP
│                   ├── ConnectionBBDD.java          # Conexión a PostgreSQL
│                   ├── Usuario.java                 # Modelo y operaciones de usuarios
│                   ├── Camisetas.java               # Modelo y operaciones de camisetas
│                   ├── RouterHandler.java           # Router de endpoints
│                   └── controller/
│                       ├── UsuarioController.java    # Controlador de usuarios
│                       └── CamisetaController.java   # Controlador de camisetas
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
│   └── Tienda.js               # Lógica de la tienda
├── Img/                        # Imágenes de productos y recursos
├── Producto.xml                # Datos de productos en XML
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
| **XML** | 1.0 | Almacenamiento estructurado de datos de productos |

## Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd ProyectoDAW
```

### 2. Configuración de la Base de Datos (PostgreSQL)

```sql
-- Crear base de datos
CREATE DATABASE ProyectoDAW;

-- Crear tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    dni VARCHAR(20)
);

-- Crear tabla de camisetas
CREATE TABLE camisetas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    img VARCHAR(500)
);
```

**Configurar credenciales en `ConnectionBBDD.java`:**
- URL: `jdbc:postgresql://localhost:5432/ProyectoDAW`
- USER: `postgres`
- PASSWORD: `postgres`

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
| **XML** | Formato estructurado para datos de productos. Fácil de parsear y mantener |

### Almacenamiento de Datos

| Herramienta | Justificación |
|-------------|---------------|
| **PostgreSQL** | Almacenamiento persistente de usuarios y camisetas. Soporta transacciones y relaciones entre tablas |
| **XML (Producto.xml)** | Almacenamiento ligero para catálogo de productos. No requiere servidor de base de datos para demo/educativo |

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
- 5. Almacenamiento de productos en XML
- 6. Diseño responsive para móviles
- 7. Animaciones y efectos visuales modernos
- 8. Carrusel de imágenes en la página de login

## Mejoras Futuras

- [ ] Integración con pasarela de pagos (Stripe/PayPal)
- [ ] Sistema de valoraciones y comentarios
- [ ] Panel de administración
- [ ] Historial de pedidos
- [ ] Notificaciones por email
- [ ] Búsqueda avanzada con filtros múltiples

## Autores

**Ruben** - Desarrollador del backend y base de datos
**Hugo** - Desarrollador del frontend y diseño

## Licencia

Este proyecto es de uso académico para el módulo de Desarrollo de Aplicaciones Web.
