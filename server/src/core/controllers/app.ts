import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { Routes } from "../interfaces/router";
import { Server } from "socket.io";
import { createServer } from "http";
import { SocketSubscriber } from "./socket_controller";
import { DataBaseConnectUseCase } from "../usecases/database_connect_usecase";
import { TypedEvent } from "../helpers/typed_event";
import { CronController } from "./cron_controller";
import { SyncMarketPlaceTransactionsUseCase } from "../../features/sync_marketplace_transactions/sync_marketplace_transactions_usecase";
import { TransactionDBModel } from "../../features/sync_marketplace_transactions/trasaction_database_model";
import { SyncMarketPlaceProductsUsecase } from "../../features/sync_marketplace_products/sync_market_products_usecase";

export enum ServerStatus {
  init = "init",
  finished = "finished",
  error = "error",
}
export enum Environment {
  DEV = "DEV",
  E2E_TEST = "E2E_TEST",
}

export class App extends TypedEvent<ServerStatus> {
  public app: express.Application;
  public port: number;
  public env: Environment;
  public socketSubscribers: SocketSubscriber<any>[];
  public io: Server;
  status: ServerStatus;

  constructor(
    routes: Routes[] = [],
    socketSubscribers: SocketSubscriber<any>[] = [],
    crones: CronController[] = [],
    env = Environment.DEV
  ) {
    super();
    this.init(routes, socketSubscribers, crones, env);
  }

  public init(
    routes: Routes[],
    socketSubscribers: SocketSubscriber<any>[],
    crones: CronController[],
    env: Environment
  ) {
    this.port = 4001;
    this.socketSubscribers = socketSubscribers;
    this.env = env;
    this.app = express();
    this.setServerStatus(ServerStatus.init);

    this.loadAppDependencies().then(() => {
      new SyncMarketPlaceTransactionsUseCase(
        "979300",
        "e73d7d61-2cdb-45da-9cc8-aa7e978f9daa",
        "6600857034c817b44a9e86c9"
      ).call();
      this.initializeMiddlewares();
      this.initializeRoutes(routes);
      crones.forEach((el) => {
        el.start();
      });
      if (this.status !== ServerStatus.error) {
        this.setServerStatus(ServerStatus.finished);
      }
    });
  }
  public listen() {
    const httpServer = createServer(this.app);

    const io = new Server(httpServer, {
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      this.socketSubscribers.map((el) => {
        el.emitter.on((e) => {
          socket.emit(el.event, e);
        });
      });
    });

    httpServer.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 HTTP http://localhost:${this.port}`);
      console.info(`🚀 WS ws://localhost:${this.port}`);
      console.info(`=================================`);
    });

    this.io = io;
  }
  setServerStatus(status: ServerStatus) {
    this.emit(status);
    this.status = status;
  }
  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      fileUpload({
        createParentPath: true,
      })
    );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  async loadAppDependencies(): Promise<void> {
    // TODO(IDONTSUDO):maybe convert it to a class and map it there
    const result = await new DataBaseConnectUseCase().call("ozon");
    await result.fold(
      async (_s) => {},
      async (_e) => {
        this.setServerStatus(ServerStatus.error);
      }
    );
  }
}
