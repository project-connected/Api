import {Team} from '../entities/Team';
import {Column, DataType, Default} from "sequelize-typescript";
import {Skill} from "./EnumSkill";
import {Theme} from "./EnumTheme";
import {Area} from "./EnumArea";
import {IsDateString, IsEnum, IsOptional} from "class-validator";

export class CreateTeamDto {
    @Column
    maxCount: number;

    @Column
    area: string;

    @Column
    content: string;

    @Column
    title: string;

    @Column
    theme: string;

    @Column
    thumbnail: string;

    @Column
    startDate!: Date;

    @Column
    endDate!: Date;

    @Column
    skill?: string;

}

export class PageableTeamDto {
    constructor() {
        this.theme = this.theme == null ? [] : this.theme;
        this.skill = this.skill == null ? [] : this.skill;
        this.area = this.area == null ? [] : this.area;
    }

    @Column
    offset: number;

    @Column
    limit: number;

    @Column
    sort: string;

    @IsEnum(Skill, {each: true})
    @IsOptional()
    @Column(DataType.ARRAY)
    skill: Skill[];

    @IsEnum(Theme, {each: true})
    @IsOptional()
    @Column(DataType.ARRAY)
    theme: Theme[];

    @IsEnum(Area, {each: true})
    @IsOptional()
    @Column(DataType.ARRAY)
    area: Area[];

    @IsOptional()
    @Column(DataType.STRING)
    startDate: string;

    @IsOptional()
    @Column(DataType.STRING)
    endDate: string;
}