import { UsersService } from './users.service';
import { RegisterDTO } from 'src/models/users.dto';
export declare class UsersController {
    private UsersService;
    constructor(UsersService: UsersService);
    hello(): string;
    getAll(): Promise<import("../entitys/users.entity").Users[]>;
    getById(id: number): Promise<import("../entitys/users.entity").Users | {
        error: string;
    }>;
    deleteUser(id: number): Promise<{
        error: string;
        sucess?: undefined;
    } | {
        sucess: string;
        error?: undefined;
    }>;
    updateUser(id: number, dataUser: RegisterDTO): Promise<{
        error: string;
        sucess?: undefined;
    } | {
        sucess: string;
        error?: undefined;
    }>;
    getRole(id: number): Promise<any[] | import("../entitys/users.entity").Users>;
}
