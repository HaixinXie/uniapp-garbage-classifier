import request from "../../utils/request";

export const signin = () => {
	return request.post('/');
}