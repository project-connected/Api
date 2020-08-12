import {Team} from '../entities/Team';
import {Column, DataType, Default} from "sequelize-typescript";
import {Skill} from "./EnumSkill";
import {Theme} from "./EnumTheme";
import {Area} from "./EnumArea";
import {IsDateString, IsEnum, IsOptional} from "class-validator";

export class CreateTeamDto {
    @Column
    public maxCount : number;

    @Column
    public area : string;

    @Column
    public content : string;

    @Column
    public title : string;

    @Column
    public theme : string;

    @Column
    public thumbnail: string;

    @Column
    public startDate!: Date;

    @Column
    public endDate!: Date;

    @Column
    public skill?: string;

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