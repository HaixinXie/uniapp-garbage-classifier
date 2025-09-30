import request from "../../utils/request";
import { BindSchoolClassRequest } from "../../types/schoolclass"

export const checkSchoolBound = () => {
	return request.get('/check-school-bound');
}

export const bindSchoolClass = (data: BindSchoolClassRequest) => {
	return request.post('/bind-class', data);
}