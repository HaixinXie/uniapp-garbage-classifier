import request from "../../utils/request";

export const getExamRecords = () => {
	return request.get('/exam-records');
}