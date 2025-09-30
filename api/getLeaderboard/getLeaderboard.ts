import { LeaderboardRequest } from "../../types/leaderboard";
import request from "../../utils/request";

export const getLeaderboard = (data: LeaderboardRequest) => {
	return request.get('/leaderboard', data);
}