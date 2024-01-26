import { Roles } from 'src/entitys/Roles.entity';
import { Repository } from 'typeorm';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Roles>);
    getAllRoles(): Promise<Roles[]>;
}
