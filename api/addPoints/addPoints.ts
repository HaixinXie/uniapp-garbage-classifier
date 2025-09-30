import { AddPointsRequest } from "../../types/points";
import request from "../../utils/request";

export const addPoints = (data: AddPointsRequest) => {
	return request.post('/add-points', data);
}