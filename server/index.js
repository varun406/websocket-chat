import express from "express";
import WebSocket, { WebSocketServer } from "ws";
import http from "http";
const app = express();

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

wss.on("connection", (ws) => {
  console.log("new client connected!");
  ws.send("Welcome new client");
  ws.on("message", (data, isBinary) => {
    // console.log("websocket message received...");
    // ws.send("server" + data);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

server.listen(3000, () => {
  console.log("listening on port 3000...");
});
