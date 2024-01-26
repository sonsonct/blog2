import { Users } from 'src/entitys/users.entity';
import { RegisterDTO } from 'src/models/users.dto';
import { Repository } from 'typeorm';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<Users>);
    getAllUsers(): Promise<Users[]>;
    getById(id: number): Promise<Users | {
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
    findRolesByUserId(id: number): Promise<any[] | Users>;
}
