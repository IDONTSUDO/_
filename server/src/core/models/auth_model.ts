
export interface AuthModel {
    auth: string;
}
export const AuthModel = {
    auth: {
        type: String,
    },
}

export const apllyAuth = (model: any) => Object.assign(model, AuthModel);
