import request from "../../utils/request";
import { LLMRequest } from "../../types/llm"

export const llmAnswer = (data: LLMRequest) => {
	return request.post('/llm-answer', data);
}