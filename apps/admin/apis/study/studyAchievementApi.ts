import { fetcher } from "@wow-class/utils";
import { mentorApiPath } from "constants/apiPath";
import type { OutstandingStudentApiRequestDto } from "types/dtos/outstandingStudent";

const studyAchievementApi = {
  postStudyAchievement: async (
    studyId: number,
    data: OutstandingStudentApiRequestDto
  ) => {
    const response = await fetcher.post(
      `${mentorApiPath.studyAchievement}?studyId=${studyId}`,
      data
    );
    return { success: response.ok };
  },

  deleteStudyAchievement: async (
    studyId: number,
    data: OutstandingStudentApiRequestDto
  ) => {
    const response = await fetcher.delete(
      `${mentorApiPath.studyAchievement}?studyId=${studyId}`,
      data
    );
    return { success: response.ok };
  },
};

export default studyAchievementApi;
