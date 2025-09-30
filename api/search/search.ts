import { SearchRequest } from "../../types/search";
import request from "../../utils/request";

export const search = (data: SearchRequest) => {
	return request.get('/knowledge/search', data);
}