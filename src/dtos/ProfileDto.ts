import {Column, DataType, Is} from "sequelize-typescript";
import {IsEnum, IsOptional, Validate} from "class-validator";
import {Skill} from "./EnumSkill";
import {Theme} from "./EnumTheme";
import {Area} from "./EnumArea";
import {Purpose} from "./EnumPurpose";
import {ValidateEnumStr} from "../utils/ValidateEnumStr";

export class PageableProfileDto{
    constructor() {
        this.theme = this.theme == null ? [] : this.theme;
        this.skill = this.skill == null ? [] : this.skill;
        this.area = this.area == null ? [] : this.area;
        this.purpose = this.purpose == null ? [] : this.purpose;
    }
    @Column
    public offset: number;

    @Column
    public limit: number;

    @IsEnum(Skill,{each:true})
    @IsOptional()
    @Column(DataType.ARRAY)
    public skill: Skill[];

    @IsEnum(Theme,{each:true})
    @IsOptional()
    @Column(DataType.ARRAY)
    public theme: Theme[];

    @IsEnum(Area,{each:true})
    @IsOptional()
    @Column(DataType.ARRAY)
    public area: Area[];

    @IsEnum(Purpose,{each:true})
    @IsOptional()
    @Column(DataType.ARRAY)
    public purpose: Purpose[];

    @IsOptional()
    @Column(DataType.STRING)
    public startDate: string;
}

export class UpdateProfileDto {
    @Column
    public profileId:number;

    @Column
    public area: string;

    @Column
    public skill: string;

    @Column
    public theme: string;

    @Column
    public purpose: string;

    @Column
    public startDate: Date;

    @Column
    public endDate: Date;

    @Column
    public title: string;

    @Column
    public content:string;
}

export class CreateProfileDto {
    @Column
    public userId?:number;

    @Validate(ValidateEnumStr, [Area])
    @Column
    public area: string;

    @Validate(ValidateEnumStr, [Skill])
    @Column
    public skill: string;

    @Validate(ValidateEnumStr, [Theme])
    @Column
    public theme: string;

    @Validate(ValidateEnumStr, [Purpose])
    @Column
    public purpose: string;

    @Column
    public startDate: Date;

    @Column
    public endDate: Date;

    @Column
    public title: string;

    @Column
    public content:string;
}
