import { HttpMethod, HttpRepository } from "../../core/repository/http_repository";

export class DocumentViewHttpRepository extends HttpRepository {
    getDoc = (id: string) => this._jsonRequest(HttpMethod.GET, `/documents/by?id=${id}`);
}
