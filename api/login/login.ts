import { LoginRequest } from "../../types/loginrequest";
import request from "../../utils/request";

export const login = (data: LoginRequest) => {
	return request.post('/login', data);
}