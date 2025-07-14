import { fetcher } from "@wow-class/utils";
import { apiPath, mentorApiPath } from "constants/apiPath";
import { tags } from "constants/tags";
import type { AnnouncementApiResponseDto } from "types/dtos/announcement";
import type { StudyBasicInfoApiResponseDto } from "types/dtos/studyBasicInfo";
import type { StudyStatisticsApiResponseDto } from "types/dtos/studyStatistics";
import type { PaginatedStudyStudentResponseDto } from "types/dtos/studyStudent";
import type { PageableType } from "types/entities/page";
import type { StudyAnnouncementType } from "types/entities/study";

import type { StudyListApiResponseDto } from "../../types/dtos/studyList";

export const studyApi = {
  getStudyList: async () => {
    const response = await fetcher.get<StudyListApiResponseDto[]>(
      apiPath.studyList,
      {
        next: { tags: [tags.studyList] },
      }
    );

    return response.data;
  },
  getMyStudyList: async () => {
    const response = await fetcher.get<StudyListApiResponseDto[]>(
      `${mentorApiPath.mentorStudy}/me`,
      {
        next: { tags: [tags.myStudyList] },
        cache: "force-cache",
      }
    );
    return response.data;
  },
  deleteStudy: async (studyId: number) => {
    const response = await fetcher.delete(`${apiPath.studyList}/${studyId}`);
    return { success: response.ok };
  },
  getStudyBasicInfo: async (studyId: number) => {
    const response = await fetcher.get<StudyBasicInfoApiResponseDto>(
      `${apiPath.commonStudy}/${studyId}`,
      {
        next: { tags: [tags.studyBasicInfo] },
        cache: "force-cache",
      }
    );
    return response.data;
  },

  publishStudyAnnouncement: async (announcement: StudyAnnouncementType) => {
    const response = await fetcher.post(
      `${mentorApiPath.studyAnnouncement}`,
      announcement
    );
    return { success: response.ok };
  },
  getStudyAnnouncement: async (studyId: number) => {
    const response = await fetcher.get<AnnouncementApiResponseDto[]>(
      `${apiPath.studyAnnouncement}/${studyId}/me`,
      {
        next: { tags: [tags.announcements] },
        cache: "force-cache",
      }
    );
    return response.data;
  },
  modifyStudyAnnouncement: async (
    studyAnnouncementId: number,
    announcement: StudyAnnouncementType
  ) => {
    const response = await fetcher.put(
      `${mentorApiPath.studyAnnouncement}/${studyAnnouncementId}`,
      announcement
    );
    return { success: response.ok };
  },
  deleteStudyAnnouncement: async (studyAnnouncementId: number) => {
    const response = await fetcher.delete(
      `${mentorApiPath.studyAnnouncement}/${studyAnnouncementId}`
    );
    return { success: response.ok };
  },
  getStudyStudents: async (studyId: number, pageable: PageableType) => {
    const response = await fetcher.get<PaginatedStudyStudentResponseDto>(
      `${mentorApiPath.mentorStudy}/${studyId}/students`,
      {
        next: { tags: [tags.students] },
        cache: "force-cache",
      },
      pageable
    );
    return response.data;
  },
  getStudyStudentsExcel: async (studyId: number) => {
    const response = await fetcher.get(
      `${mentorApiPath.mentorStudy}/${studyId}/students/excel`,
      {
        next: { tags: [tags.studentsExcel] },
        cache: "force-cache",
      }
    );

    return response.data;
  },
  getStudyStatistics: async (studyId: number) => {
    const response = await fetcher.get<StudyStatisticsApiResponseDto>(
      `${mentorApiPath.mentorStudy}/${studyId}/statistics`,
      {
        next: { tags: [tags.statistics] },
      }
    );
    return response.data;
  },
};
