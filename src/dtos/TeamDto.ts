import {Team} from '../entities/Team';
import {Column} from "sequelize-typescript";

export class CreateTeamDto {
    @Column
    public maxCount : number;

    @Column
    public areaId : string;

    @Column
    public content : string;

    @Column
    public title : string;

    @Column
    public themeId : string;

    @Column
    public thumbnail: string;

    @Column
    public startDate!: Date;

    @Column
    public endDate!: Date;

}

export class PageableTeamDto {
    @Column
    public offset: number;

    @Column
    public limit: number;

    @Column
    public sort: string;
}