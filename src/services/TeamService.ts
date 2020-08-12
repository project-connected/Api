import {Service} from 'typedi';
import {CreateTeamDto, PageableTeamDto} from "../dtos/TeamDto";
import {Team} from "../entities/Team";
import {Builder} from "builder-pattern";
import {Response} from "../dtos/Response";

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
    ) {
        try {

            switch (sort) {
                default:
                    const result = await Team.findAll({offset, limit, order: [['createDate', 'desc']], raw:true});
                    return Builder(Response)
                        ._links({self: ''})
                        .status(200)
                        .result(result)
                        .build();
            }
        }catch (e) {
            return Builder(Response)
                ._links({self: ""})
                .status(500)
                .message('팀목록을 가져오는데 오류가 발생했습니다.')
                .result(null)
                .build();
        }
    }
}