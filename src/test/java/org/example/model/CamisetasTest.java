package org.example.model;

import com.google.gson.JsonArray;
import org.example.config.ConnectionBBDD;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CamisetasTest {
    private Camisetas camisetas;
    /**
     * Preparar el entorno con la instancia antes de los test
     */
    @BeforeEach
    void setUP(){
        camisetas = new Camisetas();
    }

    /**
     * Comprobar que recoge camisetas
     */
    @Test
    void listarCamisetas() {
        assertNotNull(camisetas.listarCamisetas());
    }

    /**
     * Comprobar que la lista que devuelve es un JsonArray
     */
    @Test
    void tipadoListarCamisetas() {
        assertTrue(camisetas.listarCamisetas() instanceof JsonArray);
    }


}