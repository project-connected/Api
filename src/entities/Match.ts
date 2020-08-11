import {AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({
    underscored: true,
})
export class Match extends Model<Match> {
    @AutoIncrement
    @PrimaryKey
    @Column
    public matchId!: number;

    @Column
    public userId! :number;

    @Column
    public teamId! :number;

    @Column
    public statusId : string;

    @Column
    public content : string;
}