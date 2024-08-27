import { fetcher } from "@wow-class/utils";
import { apiPath, mentorApiPath } from "constants/apiPath";
import { tags } from "constants/tags";
import type { DashboardApiResponseDto } from "types/dtos/auth";
import type { MyStudyListApiResponseDto } from "types/dtos/studyList";

export const dashboardApi = {
  getDashboardInfo: async () => {
    const response = await fetcher.get<DashboardApiResponseDto>(
      apiPath.dashboard,
      {
        next: { tags: [tags.dashboard] },
        cache: "no-store",
      }
    );

    const studyRole = response.data?.member.studyRole;
    const manageRole = response.data?.member.manageRole;

    return { studyRole, manageRole };
  },
  getMyStudyList: async () => {
    const response = await fetcher.get<MyStudyListApiResponseDto[]>(
      mentorApiPath.studyList,
      {
        next: { tags: [tags.dashboard] },
        cache: "force-cache",
      }
    );
    return response.data;
  },
};
