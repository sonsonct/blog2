import { RolesService } from './roles.service';
export declare class RolesController {
    private RolesService;
    constructor(RolesService: RolesService);
    getAllRole(): Promise<import("../entitys/Roles.entity").Roles[]>;
}
