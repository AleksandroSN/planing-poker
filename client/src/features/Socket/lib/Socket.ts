import io, { Socket } from "socket.io-client";
import { SocketActions } from "../types";
import { IO_SOCKET_HOST } from "./config";

export default class SocketAPI {
  socket?: Socket;

  connect(): Promise<void> {
    this.socket = io(IO_SOCKET_HOST);
    return new Promise<void>((resolve, reject) => {
      this.socket?.on("connect", () => resolve());
      this.socket?.on("connect_error", (error) => reject(error));
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
  }

  emit(event: SocketActions, data: []): Promise<unknown> {
    return new Promise<unknown>((resolve) => {
      this.socket?.emit(event, ...data, (response: unknown) => {
        if (response) resolve(response);
      });
    });
  }

  on(event: SocketActions, fun: () => void): Promise<void> {
    return new Promise<void>((resolve) => {
      this.socket?.on(event, fun);
      resolve();
    });
  }
}