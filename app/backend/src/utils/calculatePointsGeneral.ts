import LeaderBoardService from '../services/LeaderBoardService';
import TeamService from '../services/TeamsService';

interface match {
  id:number
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

const leaderBoardService = new LeaderBoardService();
const teamService = new TeamService();
let name : string | undefined = '';
let totalPoints = 0;
let totalGames = 0;
let totalVictories = 0;
let totalDraws = 0;
let totalLosses = 0;
let goalsFavor = 0;
let goalsOwn = 0;
let goalsBalance = 0;
let efficiency = 0.00;
/* let victoriesHome = 0;
let drawHome = 0;
let victoriesAway = 0;
let drawAway = 0; */

const calculatePointsVictDrawHome = (match: match) => {
  if (match.homeTeamGoals > match.awayTeamGoals) {
    /* victoriesHome += 1; */
    totalVictories += 1;
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  }
  if (match.homeTeamGoals === match.awayTeamGoals) {
    /*  drawHome += 1; */
    totalDraws += 1;
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  }
  if (match.homeTeamGoals < match.awayTeamGoals) {
    totalLosses += 1;
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  }
};

const calculatePointsVictDrawAway = (match: match) => {
  if (match.awayTeamGoals > match.homeTeamGoals) {
    /* victoriesAway += 1; */
    totalVictories += 1;
    goalsFavor += match.awayTeamGoals;
    goalsOwn += match.homeTeamGoals;
  }
  if (match.awayTeamGoals === match.homeTeamGoals) {
    /* drawAway += 1; */
    totalDraws += 1;
    goalsFavor += match.awayTeamGoals;
    goalsOwn += match.homeTeamGoals;
  }
  if (match.homeTeamGoals > match.awayTeamGoals) {
    goalsFavor += match.awayTeamGoals;
    totalLosses += 1;
    goalsOwn += match.homeTeamGoals;
  }
};

const calculateData = () => {
  totalPoints = (totalVictories * 3) + totalDraws;
  goalsBalance = goalsFavor - goalsOwn;
  efficiency = ((totalPoints / (totalGames * 3)) * 100);
};

const getMatches = async (id:number) => {
  const data = await leaderBoardService.getMatches(id);
  const findTeamName = await teamService.findTeam(id);
  const matches = JSON.parse(data);
  name = findTeamName?.teamName;
  matches.homeTeam.forEach(calculatePointsVictDrawHome);
  matches.awayTeam.forEach(calculatePointsVictDrawAway);
  totalGames = matches.homeTeam.length + matches.awayTeam.length;
  calculateData();
};

const eraseValues = () => {
  name = '';
  totalPoints = 0;
  totalGames = 0;
  totalVictories = 0;
  totalDraws = 0;
  totalLosses = 0;
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;
  efficiency = 0.00;
};

const generateObj = async (id: number) => {
  await getMatches(id);
  const obj = {
    name,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance,
    efficiency: efficiency.toFixed(2),
  };
  eraseValues();
  return obj;
};

const generateLeaderBoards = async (ids: number[]) => {
  const arr1 = Promise.all(ids.map(async (id) => generateObj(id)));
  return arr1;
};

const generateLeaderBoard = async () => {
  // 1º pegar as ids
  const ids = await leaderBoardService.generateIds();
  const arr = await generateLeaderBoards(ids);
  return arr.sort((a, b) => b.totalPoints - a.totalPoints
  || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);
};
export default generateLeaderBoard;
