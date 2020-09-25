import {Column, DataType, Is} from "sequelize-typescript";
import {IsEnum, IsOptional, Validate} from "class-validator";
import {Skill} from "./EnumSkill";
import {Theme} from "./EnumTheme";
import {Area} from "./EnumArea";
import {Purpose} from "./EnumPurpose";
import {ValidateEnumArr} from "../utils/ValidateEnumArr";

export class PageableProfileDto{
    constructor() {
        // this.theme = this.theme == null ? [] : this.theme;
        // this.skill = this.skill == null ? [] : this.skill;
        // this.area = this.area == null ? [] : this.area;
        // this.purpose = this.purpose == null ? [] : this.purpose;
    }
    @Column
    public offset: number;

    @Column
    public limit: number;

    // @IsEnum(Skill,{each:true})
    @Validate(ValidateEnumArr, [Skill])
    @IsOptional()
    @Column(DataType.ARRAY)
    public skill: any;

    // @IsEnum(Theme,{each:true})
    @Validate(ValidateEnumArr, [Theme])
    @IsOptional()
    @Column(DataType.ARRAY)
    public theme: any;

    // @IsEnum(Area,{each:true})
    @Validate(ValidateEnumArr, [Area])
    @IsOptional()
    @Column(DataType.ARRAY)
    public area: any;

    // @IsEnum(Purpose,{each:true})
    @Validate(ValidateEnumArr, [Purpose])
    @IsOptional()
    @Column(DataType.ARRAY)
    public purpose: any;

    @IsOptional()
    @Column(DataType.STRING)
    public startDate: string;
}

export class UpdateProfileDto {
    @Column
    public profileId:number;

    @Validate(ValidateEnumArr, [Area])
    @IsOptional()
    @Column(DataType.ARRAY)
    public area: any;

    @Validate(ValidateEnumArr, [Skill])
    @IsOptional()
    @Column(DataType.ARRAY)
    public skill: any;

    @Validate(ValidateEnumArr, [Theme])
    @IsOptional()
    @Column(DataType.ARRAY)
    public theme: any;

    @Validate(ValidateEnumArr, [Purpose])
    @IsOptional()
    @Column(DataType.ARRAY)
    public purpose: any;

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

    @Validate(ValidateEnumArr, [Area])
    @Column(DataType.ARRAY)
    public area: any;

    @Validate(ValidateEnumArr, [Skill])
    @Column(DataType.ARRAY)
    public skill: any;

    @Validate(ValidateEnumArr, [Theme])
    @Column(DataType.ARRAY)
    public theme: any;

    @Validate(ValidateEnumArr, [Purpose])
    @Column(DataType.ARRAY)
    public purpose: any;

    @Column
    public startDate: Date;

    @Column
    public endDate: Date;

    @Column
    public title: string;

    @Column
    public content:string;
}
