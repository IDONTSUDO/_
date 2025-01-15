import { Result } from "../helpers/result";

export class GetTheLargestNumberFromACollectionUseCase<D> {
    databaseModel: D;

    constructor(model) {
        this.databaseModel = model;
    }
    // ONLY NUMBER PROPERTY
    call = async (propertyInNumber: string): Promise<Result<Error, Number>> => {
        try {
            // @ts-expect-error
            const model = await this.databaseModel.findOne({})
                .sort({ propertyInNumber: -1 }) // Сортировка по убыванию
                .exec();

            return Result.ok(model[propertyInNumber])
        } catch (error) {
            return Result.error(error)
        }

    };

}