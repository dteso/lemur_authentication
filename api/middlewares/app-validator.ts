/* eslint-disable @typescript-eslint/no-explicit-any */
class AppValidator {

    static async validateName(req: any, res: any, name: string) {
        const errors = [];
        const requiredErrors = await AppValidator.validateRequired(req, res, 'name', name);
        errors.push(...requiredErrors);
        if (name && name.length > 10) {
            errors.push({
                field: 'name',
                errorMessage: "Name can´t be longer than 10 chars."
            });
        }
        return errors;
    }

    static async validateEmail(req: any, res: any, email: string) {
        const errors = [];
        const requiredErrors = await AppValidator.validateRequired(req, res, 'email', email);
        errors.push(...requiredErrors);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push({
                field: 'email',
                errorMessage: 'Invalid email format',
            });
        }
        return errors;
    }

    static async validatePassword(req: any, res: any, password: string) {
        const errors = [];
        const requiredErrors = await AppValidator.validateRequired(req, res, 'password', password);
        errors.push(...requiredErrors);
        // Verificar si la contraseña tiene al menos una mayúscula, una minúscula, un número y un carácter especial
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
        if (!passwordRegex.test(password)) {
            errors.push({
                field: 'password',
                errorMessage: 'Password must have at least one uppercase letter, one lowercase letter, one number, and one special character.',
            });
        }
        return errors;
    }

    static async validateStatus(req: any, res: any, status: boolean) {
        const errors = [];
        const requiredErrors = await AppValidator.validateRequired(req, res, 'status', status);
        errors.push(...requiredErrors);
        return errors;
    }

    static async validateIsNumber(req: any, res: any, role: any) {
        const errors = [];
        const integerValue = parseInt(role, 10);
        if (Number.isNaN(integerValue)) {
            errors.push({
                field: 'roleId',
                errorMessage: "Role Id must be a number."
            });
        }
        return errors;
    }

    static async validateRequired(req: any, res: any, key: string, value: any) {
        const errors = [];
        if (!value || value.length === 0) {
            errors.push({
                field: key,
                errorMessage: `${key} is required.`
            });
        }
        return errors;
    }
}



export default AppValidator;