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
} from 'sequelize-typescript';

@Table({
    underscored: true,
})
export class User extends Model<User>{
    @AutoIncrement
    @PrimaryKey
    @Column
    public userId!: number;

    @Column(DataType.STRING)
    public userName!: string;

    @Column(DataType.STRING)
    public email!: string;
}