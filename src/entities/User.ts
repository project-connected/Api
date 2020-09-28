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
    AutoIncrement, BeforeCreate, AfterCreate, Default,
} from 'sequelize-typescript';
import bcrypt  from 'bcrypt';
import {Profile} from "./Profile";
@Table({
    underscored: true,
})
export class User extends Model<User>{
    @AutoIncrement
    @PrimaryKey
    @Column
    public userId!: number;

    @Column(DataType.STRING)
    public email!: string;

    @Column(DataType.STRING)
    public password!: string;

    @Column(DataType.STRING)
    public userName!: string;

    @Column(DataType.STRING)
    public area: string;

    @Column
    public skill: string;

    @Column
    public content:string;

    @Column
    public thumbnail:string;

    @HasOne(()=> Profile)
    public profile: Profile;

    @BeforeCreate
    static async hashPassword(instance : User) {
        instance.password = await bcrypt.hash(instance.password, 10);
    }

    async comparePassword(unencryptedPassword: string) : Promise<boolean> {
        return await bcrypt.compare(unencryptedPassword, this.password);
    }

}