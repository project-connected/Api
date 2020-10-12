import {AutoIncrement, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";

@Table({
    underscored: true,
})
export class CommonCode extends Model<CommonCode> {
    @AutoIncrement
    @PrimaryKey
    @Column
    public commonCodeId!: number;

    @Column
    public code! :string;

    @Column
    public parentCode : string;

    @Column
    public name: string;

    @Column
    public description: string;

    @Column
    public extra: string;

    @CreatedAt
    public createDate: Date;

    @UpdatedAt
    public updateDate: Date;
}