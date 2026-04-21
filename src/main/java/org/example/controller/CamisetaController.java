package org.example.controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sun.net.httpserver.HttpExchange;
import org.example.Camisetas;
import org.example.Usuario;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class CamisetaController {

    private static HttpClient client = HttpClient.newHttpClient();
    Usuario usuario = new Usuario();

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



            sendResponse(exchange, 404, "Endpoint dogs no válido");

        } catch (Exception e) {
            sendResponse(exchange, 500, "Error llamando a la API dogs");
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

    public class Message{
        List<String> dogs;

        public List<String> getDogs() {
            return dogs;
        }

        public void setDogs(List<String> dogs) {
            this.dogs = dogs;
        }

        @Override
        public String toString() {
            return "Message{" +
                    "dogs=" + dogs +
                    '}';
        }
    }


    public static HttpResponse<String> requestHTTP(String apiUrl) throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(apiUrl))
                .GET()
                .build();

        HttpResponse<String> response =
                client.send(request, HttpResponse.BodyHandlers.ofString());
        return response;
    }



    private static void addCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

}
