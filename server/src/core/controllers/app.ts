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
import { dirname } from "path";
import { CheckAndCreateStaticFilesFolderUseCase } from "../usecases/check_and_create_static_files_folder_usecase";
import { CreateFileUseCase } from "../usecases/create_file_usecase";
import { DeleteFolderRecursiveContent, ReadExel } from "../../main";
import { TransactionDBModel } from "../../features/sync_marketplace_transactions/trasaction_database_model";
import { Result } from "../helpers/result";

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
  // eslint-disable-next-line @typescript-eslint/ban-types
  public listen(callBack?: Function) {
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
    callBack?.()
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
    this.app.post('/exel-upload', async (req, res) => {
      await new DeleteFolderRecursiveContent().call(App.staticFilesStoreDir())
      // eslint-disable-next-line no-async-promise-executor
      await new Promise<void>(async (resolve) => {
        for await (const el of Object.values(req["files"])) {
          const data = el as any;
          await new CreateFileUseCase().call(App.staticFilesStoreDir() + '/target.xlsx', data.data as any as Buffer)
        }
        resolve()
      });
      // console.log((await new ReadExel().call(App.staticFilesStoreDir() + 'target.xlsx', App.staticFilesStoreDir())).length);
      (await new ReadExel().call(App.staticFilesStoreDir() + 'target.xlsx', App.staticFilesStoreDir())).map((el) => new Transaction().fromExel(el as any)).filter((el) => el !== undefined).forEach(async (transaction) => {
        if (transaction !== undefined) {
          if (await TransactionDBModel.findOne({ operationId: transaction.accrualID }) === null) {
            const model = new TransactionDBModel();
            model.skuProduct = transaction.ozonSKU;
            model.amount = transaction.sum;
            // console.log(JSON.stringify(el));
            model.date = transaction.accrualDate;
            model.operationId = transaction.accrualID
            model.nameOfProductOrService = transaction.groupOfServices;
            model.accrualType = transaction.accrualType;
            model.quality = transaction.quality;
            await model.save()
          }
        }
      })

      return res.status(200).json('ok');
    });
  }

  async loadAppDependencies(): Promise<void> {
    await new CheckAndCreateStaticFilesFolderUseCase().call()

    await (await new DataBaseConnectUseCase().call("ozon")).fold(
      async (_s) => { },
      async (_e) => {
        this.setServerStatus(ServerStatus.error);
      }
    );
  }
  static staticFilesStoreDir = () => {
    const dir = dirname(__filename);
    const rootDir = dir.slice(0, dir.length - 20);

    return rootDir + "public/";
  };
}


class Transaction {


  accrualType: string; //"__EMPTY_2": "Эквайринг", //Тип начисления
  accrualID: string; //"Период: 11.02.2025-11.02.2025": "77189758-0684", //ID начисления
  accrualDate: Date;   //"__EMPTY": 45699, //Дата начисления
  article: string; //   "__EMPTY_3": "26890073", //Артикул
  sum: number;  //   "__EMPTY_12": -4.3 //Сумма итого, руб
  quality: number;   //   "__EMPTY_6": 1, //Количество
  productName: string;  //   "__EMPTY_5": "Ваза Колонна цвет белый", //Название товара
  ozonSKU: string   //   "__EMPTY_4": "1657243290", //Ozon SKU
  groupOfServices: string // "__EMPTY_1": "Услуги агентов", //Группа услуг
  fromExel(exel: {
    string: string;
    __EMPTY: number;
    __EMPTY_1: string;
    __EMPTY_2: string;
    __EMPTY_3: string;
    __EMPTY_4: string;
    __EMPTY_5: string;
    __EMPTY_6: number;
    __EMPTY_7: number;
    __EMPTY_8: number;
    __EMPTY_9: string;
    __EMPTY_10: number;
    __EMPTY_11: number;
    __EMPTY_12: number;
  }
  ) {
    if (Object.values(exel).at(0) === 'ID начисления') {
      return;
    }

    this.accrualID = Object.values(exel).at(0) as any;
    this.accrualType = exel.__EMPTY_2;
    this.accrualDate = exel.__EMPTY.exelToDate();
    this.article = exel.__EMPTY_3;
    this.sum = exel.__EMPTY_12;
    this.quality = exel.__EMPTY_6;
    this.productName = exel.__EMPTY_5;
    this.ozonSKU = exel.__EMPTY_4;
    this.groupOfServices = exel.__EMPTY_1;
    return this;

  }

}