import {Authorized, Body, CurrentUser, Get, HttpCode, JsonController, Post, QueryParams} from "routing-controllers";
import {CreateTeamDto, PageableTeamDto} from "../dtos/TeamDto";
import {TeamService} from "../services/TeamService";
// import {sequelize} from "../database";
import {MatchService} from "../services/MatchService";
import {Team} from "../entities/Team";
import {Builder} from "builder-pattern";
import {CreateMatchDto} from "../dtos/MatchDto";
import {User} from "../entities/User";
import {Container, Inject} from "typedi";
import {Response} from "../dtos/Response";


@JsonController("/team")
export class TeamController{
    constructor(private teamService: TeamService,
                private matchService: MatchService,
                @Inject("sequelize") private sequelize) {}
    /**
     * 새로운 팀을 등록한다.
     * @param creatTeamDto
     */
    @HttpCode(200)
    @Post()
    @Authorized()
    public async createTeam(@Body() creatTeamDto:CreateTeamDto, @CurrentUser() user?:User){
        try {
            const result = await this.sequelize.transaction(async (t) => {
                const team:Team = await this.teamService.createTeam(creatTeamDto, t);

                const createMatchDto = Builder(CreateMatchDto)
                    .userId(user.userId)
                    .teamId(team.teamId)
                    .statusId("B01000") // 팀장 코드
                    .build();

                const match = await this.matchService.createMatch(createMatchDto, t);

                return team;
            });
            return result;
        }catch (e) {
            console.log(e);
            return Builder(Response)
                .status(500)
                .message('팀등록 처리중 에러가 발생했습니다.');
        }
    }

    @HttpCode(200)
    @Get()
    public async getAll(
        @QueryParams() pageableTeamDto: PageableTeamDto
    ){
        return await this.teamService.getTeams(
            pageableTeamDto.offset,
            pageableTeamDto.limit,
            pageableTeamDto.sort
        );
    }
}