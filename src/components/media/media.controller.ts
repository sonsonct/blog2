import { MediaService } from 'src/components/media/media.service';
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("media")
@Controller('media')
export class MediaController {
    constructor(
        private MediaService: MediaService,
    ) { }
    @Get()
    findAll() {
        return this.MediaService.findAll();
    }
}
