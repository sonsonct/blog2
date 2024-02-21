import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
    async uploadFile(
        file: Express.Multer.File,
    ) {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream({ folder: "upload", resource_type: "auto" }, (error, result) => {
                if (error) { console.log(error); return reject(error) };
                resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        });
    }
}
