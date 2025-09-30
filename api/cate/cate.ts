import { CateRequest } from "../../types/cate";
import request from "../../utils/request";

export const getCate = (data: CateRequest) => {
	return request.get('/knowledge', data);
}