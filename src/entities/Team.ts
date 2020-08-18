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
    AutoIncrement,
    BeforeCreate,
} from 'sequelize-typescript';
import {User} from './User';

@Table({
    underscored: true,
})
export class Team extends Model<Team> {
    @AutoIncrement
    @PrimaryKey
    @Column
    teamId!: number;

    @ForeignKey(() => User)
    @Column
    createdUser: User

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
    viewCount: number;

    @Column
    startDate!: Date;

    @Column
    endDate!: Date;

    @CreatedAt
    createDate: Date;

    @UpdatedAt
    updateDate: Date;

    @Column
    skill?: string;
}