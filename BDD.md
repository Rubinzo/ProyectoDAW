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
