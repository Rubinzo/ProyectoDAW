package org.example.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.sun.net.httpserver.HttpExchange;
import org.example.model.Camisetas;
import org.example.model.Usuario;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

public class CamisetaController {

    private static HttpClient client = HttpClient.newHttpClient();
    Usuario usuario = new Usuario();

    /**
     * Para manejar los endpoints
     * Mandar la lista de camisetas de la BDD
     * @param exchange
     * @throws IOException
     */
    public void handle(HttpExchange exchange) throws IOException {

        String method = exchange.getRequestMethod();
        if (method.equalsIgnoreCase("OPTIONS")) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }
        String path = exchange.getRequestURI().getPath();

        try {

            if (path.equals("/stock/camisetas")) {
                addCorsHeaders(exchange);
                JsonArray response = new JsonArray();
                Camisetas camisetas = new Camisetas();
                response = camisetas.listarCamisetas();

                sendResponse(exchange, 200, response.toString());
                return;
            }



            sendResponse(exchange, 404, "Endpoint no válido");

        } catch (Exception e) {
            sendResponse(exchange, 500, "Error llamando");
        }
    }

    public UsuarioController.Message getMessage(String apiUrl) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .GET()
                .build();

        // Envío de la petición
        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());

        // Parseo del JSON
        Gson gson = new Gson();

        UsuarioController.Message data = gson.fromJson(response.body(), UsuarioController.Message.class);
        return data;
    }

    private void sendResponse(HttpExchange exchange, int status, String body) throws IOException {

        exchange.getResponseHeaders().add("Content-Type", "application/json");

        byte[] bytes = body.getBytes();

        exchange.sendResponseHeaders(status, bytes.length);

        OutputStream os = exchange.getResponseBody();
        os.write(bytes);
        os.close();
    }



    /**
     * Método que crea el http
     * @param apiUrl
     * @return
     * @throws IOException
     * @throws InterruptedException
     */
    public static HttpResponse<String> requestHTTP(String apiUrl) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .GET()
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());
        return response;
    }


    /**
     * Cors para la web
     * @param exchange
     */
    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

}
