package org.example;


import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.net.InetSocketAddress;

public class Main {
    static void main(String[] args) {

        try {
            ConnectionBBDD.getConnection();
            System.out.println("Conexión correcta a PostgreSQL.");
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
        Usuario usuario = new Usuario();
//        usuario.insertarUsuario("Marco","1234");
        usuario.listarUsuarios();



    try {
        crearServer();
    }catch (IOException e){
        System.out.println(e.getMessage());
    }



            System.out.println("Servidor iniciado en http://localhost:8080/user/register");
            Camisetas camisetas = new Camisetas();
//            camisetas.insertarCamisetas("PRIMERA EQUIPACIÓN REAL MADRID 2024-25", 39.99, "https://tnorth.es/cdn/shop/files/RMCFMZ0195-01-1_1.webp?v=1773682744&width=832", "España", false, "Real Madrid");
//            camisetas.insertarCamisetas("PRIMERA EQUIPACIÓN SEVILLA 2024-2025", 34.95, "https://tnorth.es/cdn/shop/files/qeF7zREXHME3ifW.jpg?v=1773683280&width=832", "España", false, "Sevilla");
//            camisetas.insertarCamisetas("PRIMERA EQUIPACIÓN BRASIL 2026 | MUNDIAL", 39.99, "https://tnorth.es/cdn/shop/files/camiseta-nike-brasil-primera-equipacion-mundial-2026.webp?v=1774617513&width=832", "Brasil", true, "Brasil");
//        camisetas.insertarCamisetas("EQUIPACIÓN RETRO FC BARCELONA 2008-09 (FINAL ROMA)", 39.99, "https://tnorth.es/cdn/shop/files/big_10_9748ad9f-83c5-48f1-818e-c724bce68d67.jpg?v=1773682851&width=832", "España", false, "FC Barcelona");
//        camisetas.insertarCamisetas("TERCERA EQUIPACIÓN BAYERN MUNICH 2024-25", 39.99, "https://tnorth.es/cdn/shop/files/9H4Tk2Bf75aYrB4.jpg?v=1773683292&width=832", "Alemania", false, "Bayern Munich");
//        camisetas.insertarCamisetas("PRIMERA EQUIPACIÓN ARGENTINA 2026 | MUNDIAL", 39.99, "https://tnorth.es/cdn/shop/files/JM5897.jpg?v=1773682575&width=832", "Argentina", true, "Argentina");
            camisetas.listarCamisetas();
    }

    public static void crearServer() throws IOException {
        // Se crea el servior y desde qué puerto va estar escuchando
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        // cada vez que arranca y se pone (http://localhost:8080)
        server.createContext("/", new RouterHandler());


        server.setExecutor(null);
        server.start();
    }


}