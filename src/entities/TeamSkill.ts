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
import {Team} from "./Team";

@Table({
    underscored: true,
})
export class TeamSkill extends Model<TeamSkill>{
    @AutoIncrement
    @PrimaryKey
    @Column
    public skillId!: number;

    @ForeignKey(() => Team)
    @Column
    public teamId!: number;

}