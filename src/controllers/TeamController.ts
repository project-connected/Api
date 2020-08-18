import {
    Authorized,
    Body,
    CurrentUser,
    Get,
    HttpCode,
    JsonController,
    Post,
    QueryParams,
    Param,
    Req,
} from "routing-controllers";
import {CreateTeamDto, PageableTeamDto} from "../dtos/TeamDto";
import {TeamService} from "../services/TeamService";
// import {sequelize} from "../database";
import {MatchService} from "../services/MatchService";
import {Team} from "../entities/Team";
import {Builder} from "builder-pattern";
import {CreateMatchDto} from "../dtos/MatchDto";
import {User} from "../entities/User";
import {Inject} from "typedi";
import {Response} from "../dtos/Response";
import {Match} from "../entities/Match";


@JsonController("/team")
export class TeamController {
    constructor(private teamService: TeamService,
                private matchService: MatchService,
                @Inject("sequelize") private sequelize) {
    }

    /**
     * Create New Team
     * @param creatTeamDto
     * @param user
     */
    @HttpCode(200)
    @Post()
    @Authorized()
    async createTeam(@Body() creatTeamDto: CreateTeamDto, @CurrentUser() user?: User) {
        try {
            return await this.sequelize.transaction(async (t) => {
                const team: Team = await this.teamService.createTeam(creatTeamDto, t);

                const createMatchDto = Builder(CreateMatchDto)
                    .userId(user.userId)
                    .teamId(team.teamId)
                    .statusId("B01000") // 팀장 코드
                    .build();

                const match: Match = await this.matchService.createMatch(createMatchDto, t);

                return team;
            });
        } catch (e) {
            console.log(e);
            return Builder(Response)
                .status(500)
                .message('팀등록 처리중 에러가 발생했습니다.')
                .build()
        }
    }

    /**
     * Get All Teams
     * @param pageableTeamDto
     */
    @HttpCode(200)
    @Get()
    async getTeams(
        @QueryParams() pageableTeamDto: PageableTeamDto
    ) {
        return await this.teamService.getTeams(
            pageableTeamDto.offset,
            pageableTeamDto.limit,
            pageableTeamDto.area,
            pageableTeamDto.skill,
            pageableTeamDto.theme,
            pageableTeamDto.sort,
            pageableTeamDto.startDate,
            pageableTeamDto.endDate
        );
    }

    /**
     * Get Single Team
     * @param id
     */
    @Get('/:id')
    async getTeam(@Param('id') id: number) {
        const team = await Team.findOne({where: {teamId: id}})
        if (team == null)
            return Builder(Response).status(500).message('존재하지 않는 팀입니다.').build()
        return Builder(Response).status(200).result(team).build()
    }

    @Post('/:id')
    @Authorized()
    async getTeamData(@Param('id') id: number, @CurrentUser() user: User) {
        const team = await Team.findOne({where: {teamId: id}})
        if (team == null)
            return Builder(Response).status(500).message('존재하지 않는 팀입니다.').build()
        if (team.)
        return Builder(Response).status(200).result(team).build()
    }
}