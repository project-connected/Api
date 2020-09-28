import {Get, HttpCode, JsonController} from "routing-controllers";
import {CommonService} from "../services/CommonService";

@JsonController("/common")
export class TeamController {

    constructor(private commonService:CommonService) {
    }

    @HttpCode(200)
    @Get("/all")
    public async getAll() {
        return this.commonService.getAll();
    }

    @HttpCode(200)
    @Get("/skills")
    public async getSkills() {
        return this.commonService.getSkills();
    }

    @HttpCode(200)
    @Get("/themes")
    public async getThemes() {
        return this.commonService.getThemes();
    }

    @HttpCode(200)
    @Get("/areas")
    public async getAreas() {
        return this.commonService.getAreas();
    }

    @HttpCode(200)
    @Get("/status")
    public async getStatus() {
        return this.commonService.getStatus();
    }

    @HttpCode(200)
    @Get("/purpose")
    public async getPurpose() {
        return this.commonService.getPurpose();
    }

}