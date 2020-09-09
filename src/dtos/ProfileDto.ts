import {Column, DataType} from "sequelize-typescript";

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
