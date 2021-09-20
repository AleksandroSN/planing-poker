import { SocketAPI } from "./SocketAPI";

export class SocketSingleton {
  protected static instance: SocketSingleton = new SocketSingleton();

  protected socket = new SocketAPI();

  constructor() {
    if (SocketSingleton.instance) {
      throw new Error(
        "Instantiation failed: use Singleton.getInstance() instead of new."
      );
    }
  }

  public static getInstance(): SocketSingleton {
    return SocketSingleton.instance;
  }

  public getSocket(): SocketAPI {
    return this.socket;
  }
}
