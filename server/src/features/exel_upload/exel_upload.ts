/* eslint-disable @typescript-eslint/ban-ts-comment */
import { App } from "../../core/controllers/app";
import { CoreHttpController } from "../../core/controllers/http_controller";
import { CreateFileUseCase } from "../../core/usecases/create_file_usecase";
import { DeleteFolderRecursiveContent } from "../../core/usecases/delete_folder_recursive_content";
import { ReadExelUseCase } from "../../core/usecases/read_exel_usecase";
import { TransactionDBModel } from "../sync_marketplace_transactions/trasaction_database_model";
import { Transaction } from "./transaction";

export class ExelUploadPresentation extends CoreHttpController<any> {
    constructor() {
        super({ url: '123' });
        this.router.post('/exel-upload', async (req, res) => {
            await new DeleteFolderRecursiveContent().call(App.staticFilesStoreDir())
            // eslint-disable-next-line no-async-promise-executor
            await new Promise<void>(async (resolve) => {
                for await (const el of Object.values(req["files"])) {
                    const data = el as any;
                    await new CreateFileUseCase().call(App.staticFilesStoreDir() + '/target.xlsx', data.data as any as Buffer)
                }
                resolve()
            });

            (await new ReadExelUseCase().call(App.staticFilesStoreDir() + 'target.xlsx', App.staticFilesStoreDir())).map((el) => new Transaction().fromExel(el as any)).filter((el) => el !== undefined).forEach(async (transaction) => {
                if (transaction !== undefined) {
                    if (await TransactionDBModel.findOne({ operationId: transaction.accrualID }) === null) {
                        const model = new TransactionDBModel();
                        model.skuProduct = transaction.ozonSKU;
                        model.amount = transaction.sum;
                        // @ts-expect-error
                        model.auth = req.authId
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

}