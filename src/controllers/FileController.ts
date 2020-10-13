import {
    JsonController,
    HttpCode,
    Get, Post, Body, Res, Put, Param, Authorized, UploadedFile
} from 'routing-controllers';
import {fileUploadOptions} from "../utils/fileUploadOptions";
import {Builder} from "builder-pattern";
import {Response} from "../dtos/Response";

@JsonController("/file")
export class FileController {

    @HttpCode(200)
    @Post("/thumb")
    public async createUser(@UploadedFile("thumb",{options:fileUploadOptions}) file: any) {
        return Builder(Response)
            .status(200)
            .result(file)
            ._links({self:''})
            .build();
    }
};