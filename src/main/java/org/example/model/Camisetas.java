package org.example.model;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.example.config.ConnectionBBDD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
public class Camisetas {
    /**
     * Comprobar las camisetas disponibles para mandarlas y para ver por consola si se neccesita
     * @return
     */
    public JsonArray listarCamisetas() {
        Gson gson = new Gson();
        JsonArray jsonRaiz = new JsonArray();

        // Definimos la consulta SQL que queremos ejecutar sobre la base de datos.
        String sql = "SELECT \n" +
                "    p.id_producto AS id,\n" +
                "    p.nombre_producto AS nombre,\n" +
                "\tp.precio_base AS precio,\n" +
                "\tp.img,\n" +
                "    e.nombre_equipo AS equipo,\n" +
                "    l.nombre_liga AS liga,\n" +
                "    m.nombre_marca AS marca,\n" +
                "    t.anio_inicio || '-' || t.anio_fin AS temporada,\n" +
                "    v.tipo_version AS version\n" +
                "    \n" +
                "FROM PRODUCTO_CAMISETA p\n" +
                "JOIN EQUIPO e ON p.id_equipo = e.id_equipo\n" +
                "JOIN LIGA_COMPETICION l ON e.id_liga = l.id_liga\n" +
                "JOIN MARCA m ON p.id_marca = m.id_marca\n" +
                "JOIN TEMPORADA t ON p.id_temporada = t.id_temporada\n" +
                "JOIN VERSION v ON p.id_version = v.id_version;";
        JsonObject listaJson = new JsonObject();
        // try-with-resources: abre los recursos y los cierra automáticamente al terminar.
        // Establece la conexión con la base de datos usando nuestra clase ConnectionBBDD.
        try (Connection conn = ConnectionBBDD.getConnection();
             // Prepara la sentencia SQL para evitar errores y ataques (SQL Injection).
             PreparedStatement stmt = conn.prepareStatement(sql);
             // Ejecuta la consulta y guarda los resultados en un ResultSet.
             ResultSet rs = stmt.executeQuery()) {

            // Itera por cada fila devuelta por la consulta.

            while (rs.next()) {
                // Obtiene los datos de cada columna ("id" y "nombre") y los imprime por consola.
                System.out.println(rs.getInt("id") + " - " + rs.getString("nombre")  +" | " + rs.getDouble("precio")+" | " + rs.getString("img")+" | " +
                        rs.getString("equipo")  +" | " + rs.getString("liga")  +" | " + rs.getString("marca")  +" | " );
                JsonObject camiseta = new JsonObject();
                camiseta.addProperty("id", rs.getInt("id"));
                camiseta.addProperty("nombre", rs.getString("nombre"));
                camiseta.addProperty("precio", rs.getDouble("precio"));
                camiseta.addProperty("img", rs.getString("img"));
                camiseta.addProperty("equipo", rs.getString("equipo"));
                camiseta.addProperty("liga", rs.getString("liga"));
                camiseta.addProperty("marca", rs.getString("marca"));
                jsonRaiz.add(camiseta);

            }

        } catch (Exception e) {
            // Si ocurre cualquier error (conexión, SQL, lectura), se imprime la traza para depurar.
            e.printStackTrace();
        }
        return jsonRaiz;
    }


    /**
     * Insertar camisetas por java
     * @param nombre
     * @param precio
     * @param img
     * @param pais
     * @param seleccion
     * @param equipo
     */
    public boolean insertarCamisetas(String nombre, double precio, String img, String pais, boolean seleccion, String equipo) {
        String sql = "INSERT INTO camisetas (nombre, precio, img, pais, seleccion, equipo) VALUES (?, ?, ?, ?, ?, ?)";


        try (Connection conn = ConnectionBBDD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, nombre);
            stmt.setDouble(2, precio);
            stmt.setString(3, img);
            stmt.setString(4, pais);
            stmt.setBoolean(5, seleccion);
            stmt.setString(6, equipo);

            stmt.executeUpdate();

            System.out.println("Camiseta insertada: " + nombre);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }


}
