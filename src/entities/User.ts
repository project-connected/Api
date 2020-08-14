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
    AutoIncrement, BeforeCreate, AfterCreate,
} from 'sequelize-typescript';
import bcrypt  from 'bcrypt';
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

    @Column(DataType.STRING)
    public password!: string;

    @BeforeCreate
    static async hashPassword(instance : User) {
        instance.password = await bcrypt.hash(instance.password, 10);
    }

    async comparePassword(unencryptedPassword: string) : Promise<boolean> {
        return await bcrypt.compare(unencryptedPassword, this.password);
    }

}