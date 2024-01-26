import { RolesService } from './roles.service';
import { Controller, Get } from '@nestjs/common';

@Controller('roles')
export class RolesController {
    constructor(
        private RolesService: RolesService,

    ) { }

    @Get('/all')
    getAllRole() {
        return this.RolesService.getAllRoles();
    }
}
