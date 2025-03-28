import { HttpMethod, HttpRepository } from "../../../../core/repository/http_repository";

export class SyncTransactionRepository extends HttpRepository {

    uploadExel(file: File) {
        const data = new FormData()
        data.append('exel',file);
        this._request(HttpMethod.POST,'/exel-upload',data)
    }
}