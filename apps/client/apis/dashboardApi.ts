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

    const {
      role: memberRole,
      manageRole,
      studyRole,
    } = response.data?.member || {};
    const currentRecruitmentOpen =
      response.data?.currentRecruitmentRound?.period.open || false;

    return { memberRole, currentRecruitmentOpen, manageRole, studyRole };
  },
};
