import { fetcher } from "@wow-class/utils";
import { apiPath } from "constants/apiPath";
import { tags } from "constants/tags";
import type { DashboardApiResponseDto } from "types/dtos/auth";

export const dashboardApi = {
  getDashboardInfo: async () => {
    const response = await fetcher.get<DashboardApiResponseDto>(
      apiPath.dashboard,
      {
        next: { tags: [tags.dashboard] },
        cache: "force-cache",
      }
    );

    const studyRole = response.data?.member.studyRole;
    const manageRole = response.data?.member.manageRole;

    return { studyRole, manageRole };
  },
};
