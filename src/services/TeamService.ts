import {Service} from 'typedi';
import {CreateTeamDto, PageableTeamDto} from "../dtos/TeamDto";
import {Team} from "../entities/Team";

@Service()
export class TeamService {

    public async createTeam(createTeamDto:CreateTeamDto, transaction): Promise<Team>{
        const result = await Team.create(createTeamDto,{transaction});
        return result.toJSON();
    }

    public async getTeams(
        offset: number,
        limit: number,
        sort?: string,
    ): Promise<Team[]>{
        switch (sort) {
            default:
                const result = await Team.findAll({offset, limit, order: 'createDate desc'});
                return result.toJSON();
        }
    }
}