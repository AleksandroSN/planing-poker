import express, { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import * as path from "path";
import {createServer} from 'http';

const app = express();
app.set("port", process.env.PORT || 3000);

let http = createServer(app);
// set up socket.io and bind it to our
// http server.
let io = new Server(http);

app.get("/", (req: Request, res: Response) => {
    console.log('http connection happened');
    res.sendFile(path.resolve("./client/index.html"));
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: Socket) {
  console.log("a user connected");
  socket.emit('test', 'Success!');
});

const server = http.listen(3000, function() {
  console.log("listening on *:3000");
});