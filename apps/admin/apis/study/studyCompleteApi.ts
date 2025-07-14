import { fetcher } from "@wow-class/utils";
import { mentorApiPath } from "constants/apiPath";
import type { StudyCompleteRequestDto } from "types/dtos/studyComplete";

const studyCompleteApi = {
  postStudyComplete: async (data: StudyCompleteRequestDto) => {
    const response = await fetcher.post(
      `${mentorApiPath.studyHistory}/complete`,
      data
    );
    return { success: response.ok };
  },

  postStudyCompleteWithdraw: async (data: StudyCompleteRequestDto) => {
    const response = await fetcher.post(
      `${mentorApiPath.studyHistory}/withdraw-completion`,
      data
    );
    return { success: response.ok };
  },
};

export default studyCompleteApi;
