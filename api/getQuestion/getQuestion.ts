import request from "../../utils/request";

export const getQuestion = () => {
	return request.get('/get-question');
}