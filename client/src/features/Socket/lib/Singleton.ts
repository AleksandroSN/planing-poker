export class SocketSingleton {
  protected static instance: SocketSingleton = new SocketSingleton();

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
}
