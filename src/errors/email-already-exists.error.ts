import { ErrorBase } from "./base.error";

export class EmailAlreadyExistsError extends ErrorBase {
    constructor(message = "O email já está cadastrado") {
        super(409, message);
    }
}
