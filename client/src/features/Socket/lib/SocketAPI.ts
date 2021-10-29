import io, { Socket } from "socket.io-client";
import { BASE_SERVER } from "../../../api";
import { SocketActions } from "../types";

export class SocketAPI {
  socket?: Socket;

  connect(): Promise<void> {
    this.socket = io(BASE_SERVER);
    return new Promise<void>((resolve, reject) => {
      this.socket?.on("connect", () => resolve());
      this.socket?.on("connect_error", (error) => reject(error));
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
  }

  emit(event: SocketActions, data: any[], isAckn: boolean): Promise<unknown> {
    if (isAckn) {
      return new Promise<unknown>((resolve, reject) => {
        this.socket?.emit(event, ...data, (response: unknown) => {
          if (response) {
            resolve(response);
          } else reject(new Error("bad response from Sockets"));
        });
      });
    }
    return new Promise<unknown>((resolve) => {
      this.socket?.emit(event, ...data);
      resolve(0);
    });
  }

  on(event: SocketActions, fun: (...args: any[]) => void): Promise<void> {
    return new Promise<void>((resolve) => {
      this.socket?.on(event, fun);
      resolve();
    });
  }
}
