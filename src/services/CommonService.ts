import {Service} from "typedi";
import {Area} from "../dtos/EnumArea";
import {Status} from "../dtos/EnumStatus";
import {Theme} from "../dtos/EnumTheme";
import {KeyValueColorDto, KeyValueDto} from "../dtos/CommonDto";
import {Response} from "../dtos/Response";
import {Builder} from "builder-pattern";
import {Skill} from "../dtos/EnumSkill";

@Service()
export class CommonService {

    public getAll(){
        let obj = {};
        obj['areas'] = this.getCommonCodeData(Area, KeyValueDto);
        obj['skills'] = this.getCommonCodeData(Skill, KeyValueColorDto);
        obj['status'] = this.getCommonCodeData(Status, KeyValueDto);
        obj['themes'] = this.getCommonCodeData(Theme, KeyValueDto);

        return Builder(Response)
            .status(200)
            ._links({self:''})
            .result(obj)
            .build();
    }

    public getCommonCodeData(
        DTO : typeof Area | typeof Skill | typeof Status | typeof Theme,
    DTOTYPE : typeof KeyValueDto | typeof KeyValueColorDto
    ){
        return Object.entries(DTO)
            .map((e)=>{
                return new DTOTYPE(e[0], e[1]).toJson();
            });
    }

    public getAreas(){
        return Builder(Response)
            .status(200)
            ._links({self:''})
            .result(this.getCommonCodeData(Area, KeyValueDto))
            .build();
    }

    public getSkills(){
        return Builder(Response)
            .status(200)
            ._links({self:''})
            .result(this.getCommonCodeData(Skill, KeyValueColorDto))
            .build();
    }

    public getStatus(){
        return Builder(Response)
            .status(200)
            ._links({self:''})
            .result(this.getCommonCodeData(Status, KeyValueDto))
            .build();
    }

    public getThemes(){
        return Builder(Response)
            .status(200)
            ._links({self:''})
            .result(this.getCommonCodeData(Theme, KeyValueDto))
            .build();
    }
}