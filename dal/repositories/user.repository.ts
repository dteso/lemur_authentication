/* eslint-disable @typescript-eslint/no-explicit-any */
import Role from "../models/role.model";
import User from "../models/user.model";

class UserRepository {

    getAllUsers(): Promise<User[] | any | null> {
        return User.findAll({ include: [{ model: Role, as: 'role' }] });
    }

    async getUserById(id: any): Promise<User | any | null> {
        return await User.findByPk(id, { include: [{ model: Role, as: 'role' }] });
    }

    createUser(body: any): Promise<User> {
        const user = new User(body);
        return user.save();
    }

    async updateUser(id: any, body: any): Promise<User | any | null> {
        const user = await User.findByPk(id, { include: [{ model: Role, as: 'role' }] });
        await user?.update(body, {
            returning: true,
        });
        return await User.findByPk(id, { include: [{ model: Role, as: 'role' }] });
    }

    async deleteUser(id: any): Promise<void | null> {
        const user = await User.findByPk(id, { include: [{ model: Role, as: 'role' }] });
        return user ? user.destroy() : null;
    }

    async getUserByEmail(email: string): Promise<User | any | null> {
        return await User.findOne({ where: { email } });
    }

    async getUserByUsername(name: string): Promise<User | any | null> {
        return await User.findOne({ where: { name } });
    }

}

export default UserRepository;