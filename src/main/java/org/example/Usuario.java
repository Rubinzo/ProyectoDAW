package org.example;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class Usuario {
    public String listarUsuarios() {
        Gson gson = new Gson();
        JsonObject jsonRaiz = new JsonObject();
        JsonObject usuario = new JsonObject();
        // Definimos la consulta SQL que queremos ejecutar sobre la base de datos.
        String sql = "SELECT * FROM usuarios";
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
                System.out.println(rs.getInt("id") + " - " + rs.getString("usuario")  +" | " + rs.getString("contraseña"));

                jsonRaiz.addProperty("id", rs.getInt("id"));
                jsonRaiz.addProperty("usuario", rs.getString("usuario"));
                jsonRaiz.addProperty("contraseña", rs.getString("contraseña"));


            }

        } catch (Exception e) {
            // Si ocurre cualquier error (conexión, SQL, lectura), se imprime la traza para depurar.
            e.printStackTrace();
        }
        return jsonRaiz.toString();
    }


    public boolean findByUser(String user) {
        boolean found = true;
        String sql = "SELECT id, usuario FROM usuarios WHERE usuario = ?";

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

    public boolean findByDNI(String dni) {
        boolean found = true;
        String sql = "SELECT id, dni FROM usuarios WHERE dni = ?";

        try (Connection conn = ConnectionBBDD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            // Sustituye el ? por el nombre que queremos buscar.
            stmt.setString(1, dni);

            // Ejecuta la consulta SELECT.
            ResultSet rs = stmt.executeQuery();

            if (!rs.next()) {
                found = false;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return found;
    }

    public boolean findByEmail(String email) {
        boolean found = true;
        String sql = "SELECT id, email FROM usuarios WHERE email = ?";

        try (Connection conn = ConnectionBBDD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            // Sustituye el ? por el nombre que queremos buscar.
            stmt.setString(1, email);

            // Ejecuta la consulta SELECT.
            ResultSet rs = stmt.executeQuery();

            if (!rs.next()) {
                found = false;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return found;
    }

    public String comprobarContraseña(String email, String contraseña){
        String mensaje = "noEmail";
        if (findByEmail(email)) {
            mensaje = "noContraseña";
            String sql = "SELECT * FROM usuarios where contraseña = "+ contraseña;
            try (Connection conn = ConnectionBBDD.getConnection();
                 PreparedStatement stmt = conn.prepareStatement(sql)) {

                // Sustituye el ? por el nombre que queremos buscar.
                stmt.setString(2, contraseña);

                // Ejecuta la consulta SELECT.
                ResultSet rs = stmt.executeQuery();

                if (!rs.next()) {
                    mensaje = "existe";
                }

            } catch (Exception e) {
                e.printStackTrace();
            }
            return mensaje;
        }

        return mensaje;
    }


    public void insertarUsuario(String usuario, String contraseña) {
        String sql = "INSERT INTO usuarios (usuario, contraseña) VALUES (?, ?)";


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

    public void deleteByName(String nombre) {

        String sql = "DELETE FROM usuarios WHERE nombre = ?";

        try (Connection conn = ConnectionBBDD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            // Sustituye el ? por el nombre del usuario a borrar.
            stmt.setString(1, nombre);

            // Ejecuta el DELETE y devuelve cuántas filas se eliminaron.
            int filas = stmt.executeUpdate();

            if (filas > 0) {
                System.out.println("Usuario eliminado: " + nombre);
                listarUsuarios();
            } else {
                System.out.println("No existe ningún usuario con el nombre: " + nombre);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void actualizarUsuario(String nombreActual, String nombreNuevo) {

        String sql = "UPDATE usuarios SET nombre = ? WHERE nombre = ?";

        try (Connection conn = ConnectionBBDD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, nombreNuevo);   // Nuevo nombre
            stmt.setString(2, nombreActual);  // Nombre que buscamos para actualizar

            int filas = stmt.executeUpdate(); // Ejecuta el UPDATE

            if (filas > 0) {
                System.out.println("Nombre actualizado de '" + nombreActual + "' a '" + nombreNuevo + "'.");
                listarUsuarios();
            } else {
                System.out.println("No existe ningún usuario con el nombre: " + nombreActual);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
