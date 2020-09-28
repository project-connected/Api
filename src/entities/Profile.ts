import {
    AfterFind,
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import {Skill, SkillColor} from "../dtos/EnumSkill";

@Table({
    underscored: true,
})
export class Profile extends Model<Profile> {
    @AutoIncrement
    @PrimaryKey
    @Column
    public profileId:number;

    @Column
    public userId:number;

    @Column
    public area: string;

    @Column
    public skill: string;

    @Column
    public theme: string;

    @Column
    public purpose: string;

    @Column(DataType.DATE)
    public startDate!: Date;

    @Column(DataType.DATE)
    public endDate!: Date;

    @Column
    public title: string;

    @Column
    public content:string;

    @CreatedAt
    public createDate: Date;

    @UpdatedAt
    public updateDate: Date;
}