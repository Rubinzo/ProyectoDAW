package org.example.model;

import com.google.gson.JsonArray;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UsuarioTest {
    private Usuario usuario;

    /**
     * Preparar el entorno con la instancia antes de los test
     */
    @BeforeEach
    void setUP(){
        usuario = new Usuario();
    }

    /**
     * Comprobar que devuelve un string del jsonRaiz.toString()
     */
    @Test
    void listarUsuarios() {
        assertTrue(usuario.listarUsuarios() instanceof String);
    }

    /**
     * Buscar por nombre si existe el usuario
     * Este método solo funcionará si se crea con el insert opcional de usuario
     * Si no se usa el insert para tener un usuario de prueba dara false y se tendría que cambiar por
     * otro que hallamos registrado
     */
    @Test
    void encontrarUsuario() {
        assertTrue(usuario.findByUser("Álex"));
    }
}