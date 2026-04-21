package org.example;


import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import org.example.controller.CamisetaController;
import org.example.controller.UsuarioController;

import java.io.IOException;
import java.io.OutputStream;

public class RouterHandler implements HttpHandler {
    private final UsuarioController usuarioController = new UsuarioController();
    private final CamisetaController camisetaController = new CamisetaController();


    @Override
    public void handle(HttpExchange exchange) throws IOException {

        String path = exchange.getRequestURI().getPath();


        if (path.startsWith("/user")) {
            usuarioController.handle(exchange);
            return;
        }
        if (path.startsWith("/stock")) {
            camisetaController.handle(exchange);
            return;
        }

        if (path.startsWith("/admin")) {
            String response = "403 - Forbidden || No tienes acceso a esta página";
            exchange.sendResponseHeaders(404, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }

        else{
            String response = "404 - Ruta no encontrada";
            exchange.sendResponseHeaders(404, response.length());
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }

    }
}
