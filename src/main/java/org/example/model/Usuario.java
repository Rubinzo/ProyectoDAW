package org.example.model;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.example.config.ConnectionBBDD;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Usuario {
    /**
     * Método para listar usuarios de la base de datos
     * @return
     */
    public String listarUsuarios() {
        Gson gson = new Gson();
        JsonObject jsonRaiz = new JsonObject();
        JsonObject usuario = new JsonObject();
        // Definimos la consulta SQL que queremos ejecutar sobre la base de datos.
        String sql = "select nombre, contrasenia\n" +
                "from cliente";
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
                System.out.println(rs.getString("nombre")  +" | " + rs.getString("contrasenia"));

                jsonRaiz.addProperty("usuario", rs.getString("nombre"));
                jsonRaiz.addProperty("contraseña", rs.getString("contrasenia"));


            }

        } catch (Exception e) {
            // Si ocurre cualquier error (conexión, SQL, lectura), se imprime la traza para depurar.
            e.printStackTrace();
        }
        return jsonRaiz.toString();
    }

    /**
     * Para encontrar usuarios con su nombre
     * @param user
     * @return
     */
    public boolean findByUser(String user) {
        boolean found = true;
        String sql = "SELECT nombre FROM cliente WHERE nombre = ?";

        try (Connection conn = ConnectionBBDD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            // Sustituye el ? por el nombre que queremos buscar.
            stmt.setString(1, user);

            // Ejecuta la consulta SELECT.
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                // Si existe al menos un usuario con ese nombre...
                System.out.println("Ya existe un usuario con ese nombre en la Base de datos pon otro");
            } else {
                System.out.println("No existe ningún usuario con el nombre: " + user);
                found = false;

            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return found;
    }

    /**
     * Se ejecuta para comprobar los datos e insertar usuarios
     * @param user
     * @param contraseña
     * @return
     */
    public boolean comparePassword(String user, String contraseña) {
        JsonObject jsonRaiz = new JsonObject();
        boolean equal = false;
        String sql = "SELECT nombre, contrasenia FROM cliente WHERE nombre = ?";

        try (Connection conn = ConnectionBBDD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            // Sustituye el ? por el nombre que queremos buscar.
            stmt.setString(1, user);

            // Ejecuta la consulta SELECT.
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                // Si existe al menos un usuario con ese nombre...
                String contraseñaBaseDatos = rs.getString("contrasenia");
                if (contraseñaBaseDatos.equals(contraseña)) {
                    equal = true;
                }
            } else {
                System.out.println("No existe ningún usuario con el nombre: " + user);
                equal = false;

            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return equal;
    }

    /**
     * Insertar el usuario con los parámetros necesarios, simulamos que los demas no existen
     * porque la base de datos es más grande de lo necesario para el modelo
     * @param usuario
     * @param contraseña
     */


    public void insertarUsuario(String usuario, String contraseña) {
        String sql = "INSERT INTO CLIENTE (nombre, contrasenia, email, telefono, direccion_envio, ciudad, codigo_postal, pais, metodo_pago_preferido, fecha_registro)\n" +
                "VALUES (?, ?, ' ', ' ', ' ', ' ', ' ', ' ',' ','01-01-2001');";


        try (Connection conn = ConnectionBBDD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, usuario);
            stmt.setString(2, contraseña);

            stmt.executeUpdate();

            System.out.println("Usuario insertado: " + usuario);
            listarUsuarios();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }


}
