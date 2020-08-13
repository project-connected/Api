import {Service} from 'typedi';
import {CreateTeamDto, PageableTeamDto} from "../dtos/TeamDto";
import {Team} from "../entities/Team";
import {Op} from "sequelize";
import {Builder} from "builder-pattern";
import {Response} from "../dtos/Response";
import {Area} from "../dtos/EnumArea";
import {Skill} from "../dtos/EnumSkill";
import {Theme} from "../dtos/EnumTheme";

@Service()
export class TeamService {

    public async createTeam(createTeamDto:CreateTeamDto, transaction): Promise<Team>{
        const result = await Team.create(createTeamDto,{transaction});
        return result.toJSON();
    }

    public async getTeams(
        offset: number,
        limit: number,
        area: Area[],
        skill: Skill[],
        theme: Theme[],
        sort?: string,
        startDate?: string,
        endDate?: string
    ) {
        try {
          let searchOptions = {};
          if (area.length)
              searchOptions['area'] = {[Op.regexp]: area.join('|')};
          if (skill.length)
              searchOptions['skill'] = {[Op.regexp]: skill.join('|')};
          if (theme.length)
              searchOptions['theme'] = {[Op.regexp]: theme.join('|')};
          if (startDate && endDate)
              searchOptions[Op.and] = [
                  {startDate: {[Op.gte]:new Date(startDate)}},
                  {endDate: {[Op.lte]:new Date(endDate+" 23:59:59")}}
              ];

            switch (sort) {
                default:
                    const result = await Team.findAll({
                        offset,
                        limit,
                        where: searchOptions,
                        order: [['createDate', 'desc']],
                        raw:true
                    });
                    return Builder(Response)
                        .status(200)
                        .result(result)
                        ._links({self:''})
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