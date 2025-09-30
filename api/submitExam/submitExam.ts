import { SubmitExamRequest } from "../../types/submitExam";
import request from "../../utils/request";

export const submitExam = (data: SubmitExamRequest) => {
	return request.post('/submit', data);
}