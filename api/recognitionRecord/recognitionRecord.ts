import request from "../../utils/request";

export const getRecognitionRecord = () => {
	return request.get('/image-records');
}