import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/entitys/Roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>,
    ) { }
    async getAllRoles() {
        try {
            return await this.rolesRepository.find();
        } catch (error) {
            console.log(error);
        }

    }
}
