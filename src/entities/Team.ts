import {
    Table,
    Model,
    PrimaryKey,
    ForeignKey,
    Column,
    CreatedAt,
    UpdatedAt,
    DataType,
    BelongsTo,
    HasOne,
    AutoIncrement, BeforeCreate,
} from 'sequelize-typescript';

@Table({
    underscored: true,
})
export class Team extends Model<Team>{
    @AutoIncrement
    @PrimaryKey
    @Column
    public teamId!: number;

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
    public viewCount : number;

    @Column
    public startDate!: Date;

    @Column
    public endDate!: Date;

    @CreatedAt
    public createDate: Date;

    @UpdatedAt
    public updateDate: Date;

    @Column
    public skill?: string;

    @Column
    public skillCount?: string;
}