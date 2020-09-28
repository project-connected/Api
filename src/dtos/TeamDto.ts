import {Team} from '../entities/Team';
import {Column, DataType, Default} from "sequelize-typescript";
import {Skill} from "./EnumSkill";
import {Theme} from "./EnumTheme";
import {Area} from "./EnumArea";
import {IsDateString, IsEnum, IsOptional, Validate} from "class-validator";
import {ValidateEnumArr} from "../utils/ValidateEnumArr";
import {Purpose} from "./EnumPurpose";

export class CreateTeamDto {
    @Column
    public maxCount : number;

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
    public content : string;

    @Column
    public title : string;

    @Column
    public thumbnail: string;

    @Column
    public startDate!: Date;

    @Column
    public endDate!: Date;

}

export class PageableTeamDto{
    constructor() {
        this.theme = this.theme == null ? [] : this.theme;
        this.skill = this.skill == null ? [] : this.skill;
        this.area = this.area == null ? [] : this.area;
    }
    @Column
    public offset: number;

    @Column
    public limit: number;

    @Column
    public sort: string;

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

    @IsOptional()
    @Column(DataType.STRING)
    public startDate: string;

    @IsOptional()
    @Column(DataType.STRING)
    public endDate: string;
}