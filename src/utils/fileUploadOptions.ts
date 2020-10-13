import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import {env} from "../env";

const s3 = new AWS.S3({
   accessKeyId:env.s3.key,
   secretAccessKey: env.s3.secret,
   region: env.s3.region
});

const storage = multerS3({
    s3,
    bucket: env.s3.bucket,
    acl: 'public-read',
    metadata(req: Express.Request, file: Express.Multer.File, callback: (error: any, metadata?: any) => void) {
        callback(null, {fieldName: file.originalname});
    },
    key(req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void) {
        callback(null,`img/${Date.now()}_${file.originalname}`);
    }
});

const opitons = {
    storage,
    limits: {
        files: 10,
        fileSize: 1024 * 1024 * 1024
    }
}

export const fileUploadOptions = () => opitons


