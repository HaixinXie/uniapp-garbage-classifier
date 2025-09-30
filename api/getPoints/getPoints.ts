import request from "../../utils/request";

export const getPoints = () => {
	return request.get('/get-points');
}