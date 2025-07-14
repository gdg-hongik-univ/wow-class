import { fetcher } from "@wow-class/utils";
import { apiPath, mentorApiPath } from "constants/apiPath";
import { tags } from "constants/tags";
import type { CreateStudyApiRequestDto } from "types/dtos/createStudy";
import type { SearchStudyMentorResponseDto } from "types/dtos/searchStudyMentor";
import type { CreateStudyDetailInfoApiRequestDto } from "types/dtos/studyDetailInfo";

export const createStudyApi = {
  postCreateStudy: async (data: CreateStudyApiRequestDto) => {
    const response = await fetcher.post(apiPath.createStudy, data);

    return { success: response.ok };
  },
  postStudyDetailInfo: async (
    data: CreateStudyDetailInfoApiRequestDto,
    studyId: number
  ) => {
    const response = await fetcher.put(
      `${mentorApiPath.mentorStudy}/${studyId}`,
      data
    );
    return { success: response.ok };
  },
  searchStudyMentor: async (
    name: string
  ): Promise<SearchStudyMentorResponseDto[]> => {
    const response = await fetcher.get(
      `${apiPath.searchMentor}?name=${name}&roles=REGULAR`,
      {
        next: { tags: [tags.memberList] },
        cache: "force-cache",
      }
    );
    return response.data.content;
  },
};
