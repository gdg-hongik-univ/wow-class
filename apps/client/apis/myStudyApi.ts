import { fetcher } from "@wow-class/utils";
import { apiPath } from "constants/apiPath";
import { tags } from "constants/tags";
import type {
  BasicStudyInfoDto,
  MyOngoingStudyInfoDtoV2,
  StudyAnnouncementListDtoV2Type,
} from "types/dtos/myStudy";

export const myStudyApi = {
  getMyOngoingStudyInfo: async () => {
    const response = await fetcher.get<MyOngoingStudyInfoDtoV2>(
      apiPath.myOngoingStudy,
      {
        next: { tags: [tags.myOngoingStudy] },
        cache: "force-cache",
      }
    );

    return response.data;
  },
  getBasicStudyInfo: async (studyId: number) => {
    const response = await fetcher.get<BasicStudyInfoDto>(
      `${apiPath.basicStudyInfo}/${studyId}`,
      {
        next: { tags: [tags.basicStudyInfo] },
        cache: "force-cache",
      }
    );

    return response.data;
  },
  getAllStudyAnnouncementList: async () => {
    const response = await fetcher.get<StudyAnnouncementListDtoV2Type>(
      apiPath.allStudyAnnouncementList,
      {
        next: { tags: [tags.allStudyAnnouncementList] },
        cache: "force-cache",
      }
    );
    return response.data;
  },
  checkAttendance: async (studySessionId: number, attendanceNumber: string) => {
    const response = await fetcher.post(
      `${apiPath.attendance}?studySessionId=${studySessionId}`,
      {
        attendanceNumber,
      }
    );

    return { success: response.ok };
  },
};
