<h1>Create Tablas<h1>
<h3></h3>
 <h1>-- LIGA_COMPETICION </h1> 
  <br>
CREATE TABLE LIGA_COMPETICION (
    id_liga      SERIAL PRIMARY KEY,
    nombre_liga  VARCHAR(100) NOT NULL,
    pais         VARCHAR(100) NOT NULL,
    tipo         VARCHAR(20) NOT NULL -- Antes: tipo_liga_enum ('club', 'seleccion')
);

<h1>-- EQUIPO</h1>
  <br>
CREATE TABLE EQUIPO (
    id_equipo     SERIAL PRIMARY KEY,
    nombre_equipo VARCHAR(100) NOT NULL,
    id_liga       INTEGER NOT NULL,
    CONSTRAINT fk_equipo_liga FOREIGN KEY (id_liga)
        REFERENCES LIGA_COMPETICION(id_liga)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

<h1>-- MARCA</h1>
  <br>
CREATE TABLE MARCA (
    id_marca      SERIAL PRIMARY KEY,
    nombre_marca  VARCHAR(100) NOT NULL UNIQUE
);

<h1>-- TEMPORADA   </h1>
<br>
CREATE TABLE TEMPORADA (
    id_temporada SERIAL PRIMARY KEY,
    anio_inicio  INTEGER NOT NULL,
    anio_fin     INTEGER NOT NULL,
    CONSTRAINT chk_temporada CHECK (anio_fin = anio_inicio + 1)
);

<h1>-- VERSION</h1>
<br>
CREATE TABLE VERSION (
    id_version        SERIAL PRIMARY KEY,
    tipo_version      VARCHAR(20) NOT NULL, -- Antes: tipo_version_enum ('replica', 'authentic')
    descripcion       VARCHAR(255),
    diferencia_precio NUMERIC(10,2) NOT NULL CHECK (diferencia_precio >= 0)
);

<h1>-- PRODUCTO_CAMISETA</h1>
<br>
CREATE TABLE PRODUCTO_CAMISETA (
    id_producto     SERIAL PRIMARY KEY,
    nombre_producto VARCHAR(150) NOT NULL,
    id_equipo       INTEGER NOT NULL,
    id_marca        INTEGER NOT NULL,
    id_temporada    INTEGER NOT NULL,
    id_version      INTEGER NOT NULL,
    img   VARCHAR(350) NOT NULL,
    precio_base        NUMERIC(10,2) NOT NULL CHECK (precio_base >= 0),
    CONSTRAINT fk_producto_equipo FOREIGN KEY (id_equipo)
        REFERENCES EQUIPO(id_equipo) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_producto_marca FOREIGN KEY (id_marca)
        REFERENCES MARCA(id_marca) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_producto_temporada FOREIGN KEY (id_temporada)
        REFERENCES TEMPORADA(id_temporada) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_producto_version FOREIGN KEY (id_version)
        REFERENCES VERSION(id_version) ON DELETE RESTRICT ON UPDATE CASCADE
);

<h1>-- CAMISETA_UNIDAD </h1>
<br>
CREATE TABLE CAMISETA_UNIDAD (
    id_camiseta_unidad SERIAL PRIMARY KEY,
    numero_serie       VARCHAR(50) NOT NULL UNIQUE,
    estado             VARCHAR(20) NOT NULL DEFAULT 'disponible', -- Antes: estado_unidad_enum
    id_producto        INTEGER NOT NULL,
    talla              VARCHAR(10) NOT NULL,
    CONSTRAINT fk_unidad_producto FOREIGN KEY (id_producto)
        REFERENCES PRODUCTO_CAMISETA(id_producto)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

<h1>-- CLIENTE</h1>
<br>
CREATE TABLE CLIENTE (
    id_cliente            SERIAL PRIMARY KEY,
    nombre                VARCHAR(100) NOT NULL,
    contrasenia            VARCHAR(150) NOT NULL,
    email                 VARCHAR(150) NOT NULL,
    telefono              VARCHAR(20),
    direccion_envio       VARCHAR(255) NOT NULL,
    ciudad                VARCHAR(100) NOT NULL,
    codigo_postal         VARCHAR(20) NOT NULL,
    pais                  VARCHAR(100) NOT NULL,
    metodo_pago_preferido VARCHAR(50),
    fecha_registro        TIMESTAMP NOT NULL DEFAULT NOW()
);

<h1>-- CONDICION_DESCUENTO</h1>
<br>
CREATE TABLE CONDICION_DESCUENTO (
    id_descuento         SERIAL PRIMARY KEY,
    nombre_descuento     VARCHAR(100) NOT NULL,
    descripcion          TEXT,
    porcentaje_descuento NUMERIC(5,2) NOT NULL CHECK (porcentaje_descuento BETWEEN 0 AND 100),
    fecha_inicio         DATE NOT NULL,
    fecha_fin            DATE NOT NULL,
    activo               BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT chk_fechas CHECK (fecha_fin >= fecha_inicio)
);

<h1>-- PEDIDO</h1>
<br>
CREATE TABLE PEDIDO (
    id_pedido                INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_cliente               INTEGER NOT NULL,
    fecha_pedido             TIMESTAMP NOT NULL DEFAULT NOW(),
    estado                   VARCHAR(20) NOT NULL DEFAULT 'pendiente', -- Antes: estado_pedido_enum
    subtotal                 NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
    descuento_aplicado       NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (descuento_aplicado >= 0),
    total                    NUMERIC(10,2) NOT NULL CHECK (total >= 0),
    direccion_envio_completa VARCHAR(255) NOT NULL,
    id_descuento             INTEGER,
    CONSTRAINT fk_pedido_cliente FOREIGN KEY (id_cliente)
        REFERENCES CLIENTE(id_cliente)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_pedido_descuento FOREIGN KEY (id_descuento)
        REFERENCES CONDICION_DESCUENTO(id_descuento)
        ON DELETE SET NULL ON UPDATE CASCADE
);

<h1>-- LINEA_PEDIDO </h1>
<br>
CREATE TABLE LINEA_PEDIDO (
    id_linea_pedido     INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_pedido           INTEGER NOT NULL,
    id_camiseta_unidad  INTEGER NOT NULL,
    precio_unitario     NUMERIC(10,2) NOT NULL CHECK (precio_unitario >= 0),
    CONSTRAINT fk_linea_pedido FOREIGN KEY (id_pedido)
        REFERENCES PEDIDO(id_pedido)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_linea_unidad FOREIGN KEY (id_camiseta_unidad)
        REFERENCES CAMISETA_UNIDAD(id_camiseta_unidad)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

<h1>-- PERSONALIZACION </h1>
<br>
CREATE TABLE PERSONALIZACION (
    id_personalizacion     INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    id_linea_pedido        INTEGER NOT NULL UNIQUE,
    nombre_personalizado   VARCHAR(100),
    numero_personalizado   VARCHAR(10),
    precio_personalizacion NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (precio_personalizacion >= 0),
    CONSTRAINT fk_personal_linea FOREIGN KEY (id_linea_pedido)
        REFERENCES LINEA_PEDIDO(id_linea_pedido)
        ON DELETE CASCADE ON UPDATE CASCADE
);

<h1>Inserts</h1>
 <h2>Camisetas</h2>
INSERT INTO LIGA_COMPETICION (nombre_liga, pais, tipo)
VALUES 
	('Seleccion', 'mundial', 'seleccion'),
    ('LaLiga', 'España', 'club'),
    ('Premier League', 'Inglaterra', 'club'),
    ('Serie A', 'Italia', 'club'),
	('Bundesliga', 'Alemania', 'club');

INSERT INTO EQUIPO (nombre_equipo, id_liga)
VALUES 
	('Seleccion', 1),
    ('Real Madrid', 2),
    ('FC Barcelona', 2),
    ('Sevilla FC', 2),
    ('Bayern de Múnich', 5);

INSERT INTO MARCA (nombre_marca)
VALUES 
    ('Nike'),
    ('Adidas'),
    ('Puma');

INSERT INTO TEMPORADA (anio_inicio, anio_fin)
VALUES 
	(2025, 2026),
	(2024, 2025),
    (2023, 2024);

INSERT INTO VERSION (tipo_version, descripcion, diferencia_precio)
VALUES 
    ('replica', 'Versión estándar para aficionados, corte cómodo.', 0.00),
    ('authentic', 'Versión de jugador, tejido técnico y corte ajustado.', 20.00);


INSERT INTO PRODUCTO_CAMISETA (nombre_producto, id_equipo, id_marca, id_temporada, id_version, img, precio_base)
VALUES 
    ('PRIMERA EQUIPACIÓN REAL MADRID 2024-25', 1, 2, 2, 2, 'https://tnorth.es/cdn/shop/files/RMCFMZ0195-01-1_1.webp?v=1773682744&width=832', 39.99),
    ('PRIMERA EQUIPACIÓN SEVILLA 2024-2025', 3, 2, 2, 1, 'https://tnorth.es/cdn/shop/files/qeF7zREXHME3ifW.jpg?v=1773683280&width=832', 34.95),
    ('PRIMERA EQUIPACIÓN BRASIL 2026 | MUNDIAL', 1, 2, 1, 3, 'https://tnorth.es/cdn/shop/files/camiseta-nike-brasil-primera-equipacion-mundial-2026.webp?v=1774617513&width=832',20);

<h2>Usuarios(No obligatorio)</h2>

INSERT INTO CLIENTE (nombre, contrasenia, email, telefono, direccion_envio, ciudad, codigo_postal, pais, metodo_pago_preferido, fecha_registro)
VALUES ('Álex', '1234', ' ', ' ', ' ', ' ', ' ', ' ',' ','01-01-2001');

<h1>Selects</h1>
<h2>Camisetas</h2>
SELECT 
    p.nombre_producto AS Producto,
    e.nombre_equipo AS Equipo,
    m.nombre_marca AS Marca,
    p.img AS Img,
    u.talla AS Talla,
    u.precio_base AS Precio,
    u.estado AS Disponibilidad
FROM PRODUCTO_CAMISETA p
JOIN EQUIPO e ON p.id_equipo = e.id_equipo
JOIN LIGA_COMPETICION l ON e.id_liga = l.id_liga
JOIN MARCA m ON p.id_marca = m.id_marca
JOIN TEMPORADA t ON p.id_temporada = t.id_temporada
JOIN VERSION v ON p.id_version = v.id_version;


SELECT 
    p.nombre_producto,
    p.img,
	p.precio_base
FROM PRODUCTO_CAMISETA p

<h2>Usuarios</h2>
select nombre, contrasenia
from cliente

<h1>Delete (En caso de necesitar)</h1>
DROP TABLE IF EXISTS CONDICION_DESCUENTO CASCADE;
DROP TABLE IF EXISTS CLIENTE CASCADE;
DROP TABLE IF EXISTS CAMISETA_UNIDAD CASCADE;
DROP TABLE IF EXISTS PRODUCTO_CAMISETA CASCADE;
DROP TABLE IF EXISTS VERSION CASCADE;
DROP TABLE IF EXISTS TEMPORADA CASCADE;
DROP TABLE IF EXISTS MARCA CASCADE;
DROP TABLE IF EXISTS EQUIPO CASCADE;
DROP TABLE IF EXISTS LIGA_COMPETICION CASCADE;


TRUNCATE TABLE 
    LIGA_COMPETICION, EQUIPO, MARCA, TEMPORADA, VERSION, 
    PRODUCTO_CAMISETA, CAMISETA_UNIDAD, CLIENTE, 
    CONDICION_DESCUENTO, PEDIDO, LINEA_PEDIDO, PERSONALIZACION 
RESTART IDENTITY CASCADE;


