export class ApplicationError extends Error {

    httpStatus: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = this.constructor.name;
        this.httpStatus = status || 500;
        Error.captureStackTrace(this, this.constructor);
    }
}