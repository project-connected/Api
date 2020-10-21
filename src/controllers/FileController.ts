import {
    JsonController,
    HttpCode,
    Get, Post, Body, Res, Put, Param, Authorized, UploadedFile, UploadedFiles
} from 'routing-controllers';
import {thumbnailUploadOptions, contentFileUploadOptions} from "../utils/fileUploadOptions";
import {Builder} from "builder-pattern";
import {Response} from "../dtos/Response";

@JsonController("/file")
export class FileController {

    @HttpCode(200)
    @Post("/thumb")
    public async postThumbnail(@UploadedFile("thumb",{options:thumbnailUploadOptions}) file: any) {
        return Builder(Response)
            .status(200)
            .result(file)
            ._links({self:''})
            .build();
    }

    @HttpCode(200)
    @Post("/content")
    public async postContentImg(@UploadedFiles("content",{options:contentFileUploadOptions}) files: any[]) {
        return Builder(Response)
            .status(200)
            .result(files)
            ._links({self:''})
            .build();
    }
};