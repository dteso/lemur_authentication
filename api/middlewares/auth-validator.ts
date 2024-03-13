/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from "express";

export class AuthValidator {

    static checkPermission = (permissionRequiredName: string) => (req: any, res: Response, next: NextFunction) => {
        const permissionNames = req.user.role.permissions.map((permission: { name: string; }) => permission.name);
        if (!permissionNames.includes(permissionRequiredName)) {
            return res.status(403).json({
                ok: false,
                errors: 'User has not allowed to make this request. Check out your role an assoacited permissions'
            });
        }
        next();
    };

}

export default AuthValidator;