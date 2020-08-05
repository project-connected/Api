import jwt from "jsonwebtoken";
import {env} from '../env';
import {User} from '../entities/User';

export const createJWT = (id: number): string => {
    const token = jwt.sign(
        {
            id,
        },
        env.app.jwtAccessSecret || "",
        {
            expiresIn: "30m",
        }
    );
    return token;
};

export const decodeJWT = async (token: string): Promise<User | undefined> => {
    try {
        // json web token을 해독함
        const decode: any = jwt.verify(token, env.app.jwtAccessSecret || "");

        // 해독한 정보에서 id를 가져옴
        const { id } = decode;

        // id로부터 유저 정보를 받아옴
        const user = await User.findOne({where:{userId:id}});
        return user;
    } catch (error) {
        return undefined;
    }
};