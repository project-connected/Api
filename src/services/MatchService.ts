import {Service} from 'typedi';
import {CreateMatchDto} from "../dtos/MatchDto";
import {Match} from "../entities/Match";

@Service()
export class MatchService {

    public async createMatch(createTeamDto:CreateMatchDto, transaction){
        const result = await Match.create(createTeamDto, {transaction});
        return result.toJSON();
    }
}