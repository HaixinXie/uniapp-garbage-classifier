import { UsernameRequest } from "../../types/username";
import request from "../../utils/request";

export const updateUsername = (data: UsernameRequest) => {
	return request.post('/update-username', data);
}