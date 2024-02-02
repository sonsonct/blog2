import { MediaService } from 'src/media/media.service';
import { Controller, Get } from '@nestjs/common';

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
