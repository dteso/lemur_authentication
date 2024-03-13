/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationError } from "../core/application.error.dto";

export class ErrorsService {
    static manageErrors(error: any, res: any) {
        if (error instanceof ApplicationError) {
            res.status(error.httpStatus || 500).json({
                status: 'technical-error',
                description: error.message
            })
        } else {
            this.manageInternalErrors(error, res);
        }
    }


    static manageInternalErrors(error: any, res: any) {
        console.log("[ERROR] Managing Internal Error", error);
        res.status(500).json({
            status: 'internal-error',
            description: error.message || error.errors[0].message
        });
    }
}