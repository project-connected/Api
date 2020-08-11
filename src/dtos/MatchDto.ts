import {Column} from "sequelize-typescript";

export class CreateMatchDto {
    @Column
    public userId! :number;

    @Column
    public teamId! :number;

    @Column
    public statusId : string;

    @Column
    public content : string;
}