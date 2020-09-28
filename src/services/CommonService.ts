import {Service} from "typedi";
import {Area} from "../dtos/EnumArea";
import {Status} from "../dtos/EnumStatus";
import {Theme} from "../dtos/EnumTheme";
import {KeyValueColorDto, KeyValueDto} from "../dtos/CommonDto";
import {Response} from "../dtos/Response";
import {Builder} from "builder-pattern";
import {Skill, SkillColor} from "../dtos/EnumSkill";
import {Purpose} from "../dtos/EnumPurpose";

@Service()
export class CommonService {

    public getAll(){
        const obj = this.getAllObj();
        return Builder(Response)
            .status(200)
            ._links({self:''})
            .result(obj)
            .build();
    }

    public getAllObj() {
        let obj = {};
        obj['areas'] = this.getCommonCodeData(Area, KeyValueDto);
        obj['skills'] = this.getCommonCodeData(Skill, KeyValueColorDto);
        obj['status'] = this.getCommonCodeData(Status, KeyValueDto);
        obj['themes'] = this.getCommonCodeData(Theme, KeyValueDto);
        obj['purpose'] = this.getCommonCodeData(Purpose, KeyValueDto);
        return obj;
    }

    public getArr(
        DTO : typeof Area | typeof Skill | typeof Status | typeof Theme | typeof Purpose,
        value? : string[]
    ){
        let arr = [];
        switch (DTO) {
            case Area :
                arr = this.getCommonCodeData(Area, KeyValueDto, value);
                break;
            case Skill:
                arr = this.getCommonCodeData(Skill, KeyValueColorDto, value);
                break;
            case Status :
                arr = this.getCommonCodeData(Status, KeyValueDto, value);
                break;
            case Theme:
                arr = this.getCommonCodeData(Theme, KeyValueDto, value);
                break;
            case Purpose:
                arr = this.getCommonCodeData(Purpose, KeyValueDto, value);
                break;
        }
        return arr;
    }

    public getCommonCodeData(
        DTO : typeof Area | typeof Skill | typeof Status | typeof Theme | typeof Purpose,
    DTOTYPE : typeof KeyValueDto | typeof KeyValueColorDto,
        value? : string[]
    ){
        return Object.entries(DTO)
            .filter(e => {
                if (value && !value.includes(e[1])) return false;
                return true;
            })
            .map((e)=>{
                if (DTO == Skill)
                    return new DTOTYPE(e[0], e[1], SkillColor[e[0]]).toJson();
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

    public getPurpose(){
        return Builder(Response)
            .status(200)
            ._links({self:''})
            .result(this.getCommonCodeData(Purpose, KeyValueDto))
            .build();
    }

    public convertJoinStr(
        sep: string,
        codeObj? : any[]
    ) {
        if (codeObj) return codeObj.map((e)=>e.value).join(sep);
        else return [];
    }
}